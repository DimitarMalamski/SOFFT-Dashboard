package nl.fontys.s3.my_app.Services;

import nl.fontys.s3.my_app.Repositories.ProductRepo;
import nl.fontys.s3.my_app.Repositories.ProductSellerRepo;
import nl.fontys.s3.my_app.Repositories.AddressRepo;
import nl.fontys.s3.my_app.Repositories.DepotRepo;

import nl.fontys.s3.my_app.models.Product;
import nl.fontys.s3.my_app.models.ProductSeller;
import nl.fontys.s3.my_app.models.Address;
import nl.fontys.s3.my_app.models.Depot;

import nl.fontys.s3.my_app.models.dtos.SalesOffer.ProductDTO;
import nl.fontys.s3.my_app.models.dtos.SalesOffer.SellerDTO;
import nl.fontys.s3.my_app.models.dtos.SalesOffer.LocationDTO;
import nl.fontys.s3.my_app.models.dtos.SalesOffer.AddressDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;


import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepo productRepo;

    @Autowired
    private ProductSellerRepo productSellerRepo;

    @Autowired
    private AddressRepo addressRepo;

    @Autowired
    private DepotRepo depotRepo;


    public Page<ProductDTO> getProductsPaged(int page, int size,
                                             String name,
                                             String classType,
                                             String color) {

        Pageable pageable = PageRequest.of(page, size);

        Page<Object[]> joinedPage = productRepo.searchProductsPagedJoined(
                name,
                classType,
                color,
                pageable
        );

        return joinedPage.map(row -> {
            Product product = (Product) row[0];
            ProductSeller ps = (ProductSeller) row[1];
            Address address = (Address) row[2];
            Depot depot = (Depot) row[3];

            return buildProductDTO(product, ps, address, depot);
        });
    }


    // REMOVE the old buildProductDTO(Product product)

    private ProductDTO buildProductDTO(Product product,
                                       ProductSeller ps,
                                       Address address,
                                       Depot depot) {

        SellerDTO sellerDTO = null;
        AddressDTO addressDTO = null;

        if (ps != null) {

            sellerDTO = new SellerDTO(
                    ps.getCompanyName(),
                    ps.getDepotId(),
                    ps.getDepositPercent() != null ? ps.getDepositPercent() : BigDecimal.ZERO,
                    ps.getDepositMinAmount() != null ? ps.getDepositMinAmount() : BigDecimal.ZERO
            );

            if (address != null) {
                addressDTO = new AddressDTO(address);
            } 
            else if (depot != null && depot.getAddressUuid() != null) {
                Address depotAddress = addressRepo.findByUuid(depot.getAddressUuid()).orElse(null);
                if (depotAddress != null) {
                    addressDTO = new AddressDTO(depotAddress);
                }
            }
        }

        LocationDTO locationDTO = null;

        if (ps != null) {
            locationDTO = new LocationDTO(
                    Boolean.TRUE.equals(ps.getIsAllowToPickup()),
                    Boolean.TRUE.equals(ps.getIsAllowToView()),
                    addressDTO
            );
        }

        return new ProductDTO(product, sellerDTO, locationDTO);
    }


    public ProductDTO getProductById(Integer id) {
        Product product = productRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));

        ProductSeller ps = productSellerRepo.findById(product.getId()).orElse(null);
        Address address = null;
        Depot depot = null;

        if (ps != null) {
            if (ps.getAddressUuid() != null) {
                address = addressRepo.findByUuid(ps.getAddressUuid()).orElse(null);
            }

            if (ps.getDepotId() != null) {
                depot = depotRepo.findById(ps.getDepotId().longValue()).orElse(null);
            }
        }

        return buildProductDTO(product, ps, address, depot);
    }
}
