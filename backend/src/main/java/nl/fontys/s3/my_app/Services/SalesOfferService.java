package nl.fontys.s3.my_app.Services;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import nl.fontys.s3.my_app.Repositories.AddressRepo;
import nl.fontys.s3.my_app.Repositories.DeliveryRepo;
import nl.fontys.s3.my_app.Repositories.ProductRepo;
import nl.fontys.s3.my_app.Repositories.SalesOfferLineRepo;
import nl.fontys.s3.my_app.Repositories.SalesOfferRepo;
import nl.fontys.s3.my_app.Repositories.SalesOfferSalesPersonRepo;
import nl.fontys.s3.my_app.Repositories.SalesPersonRepo;
import nl.fontys.s3.my_app.models.Address;
import nl.fontys.s3.my_app.models.Delivery;
import nl.fontys.s3.my_app.models.dtos.SalesOffer.AddressDTO;
import nl.fontys.s3.my_app.models.dtos.SalesOffer.CompanyDTO;
import nl.fontys.s3.my_app.models.dtos.SalesOffer.DeliveryDTO;
import nl.fontys.s3.my_app.models.dtos.SalesOffer.DiscountDTO;
import nl.fontys.s3.my_app.models.dtos.SalesOffer.LocationDTO;
import nl.fontys.s3.my_app.models.dtos.SalesOffer.PriceDTO;
import nl.fontys.s3.my_app.models.dtos.SalesOffer.ProductDTO;
import nl.fontys.s3.my_app.models.dtos.SalesOffer.ProductPriceDTO;
import nl.fontys.s3.my_app.models.dtos.SalesOffer.SalesOfferDTO;
import nl.fontys.s3.my_app.models.dtos.SalesOffer.SalesOfferLineDTO;
import nl.fontys.s3.my_app.models.dtos.SalesOffer.SalesPersonDTO;
import nl.fontys.s3.my_app.models.dtos.SalesOffer.SellerDTO;

@Service
public class SalesOfferService {

    private static final PriceDTO TEMP_PRICEDTO = new PriceDTO("Euro", BigDecimal.valueOf(100));
    private static final SellerDTO TEMP_SELLERDTO = new SellerDTO("Temp Seller", 1, BigDecimal.valueOf(100),
            BigDecimal.valueOf(0));
    private static final ProductPriceDTO TEMP_PRODUCTPRICEDTO = new ProductPriceDTO("Euro", BigDecimal.valueOf(100));

    private final SalesOfferRepo salesOfferRepo;
    private final SalesOfferLineRepo salesOfferLineRepo;
    private final ProductRepo productRepo;
    private final AddressRepo addressRepo;
    private final DeliveryRepo deliveryRepo;
    private final SalesOfferSalesPersonRepo salesOfferSalesPersonRepo;
    private final SalesPersonRepo salesPersonRepo;

    public SalesOfferService(SalesOfferRepo salesOfferRepo,
            SalesOfferLineRepo salesOfferLineRepo,
            ProductRepo productRepo,
            AddressRepo addressRepo,
            DeliveryRepo deliveryRepo,
            SalesOfferSalesPersonRepo salesOfferSalesPersonRepo,
            SalesPersonRepo salesPersonRepo) {
        this.salesOfferRepo = salesOfferRepo;
        this.salesOfferLineRepo = salesOfferLineRepo;
        this.productRepo = productRepo;
        this.addressRepo = addressRepo;
        this.deliveryRepo = deliveryRepo;
        this.salesOfferSalesPersonRepo = salesOfferSalesPersonRepo;
        this.salesPersonRepo = salesPersonRepo;
    }

    public List<SalesOfferDTO> getAllSalesOffersDTO() {
        List<SalesOfferDTO> dtos = salesOfferRepo.findAll()
                .stream()
                .map(so -> {
                    // 1 The DiscountDTO (always TEMP_PRICEDTO for now)
                    // 2 the CompanyDTO
                    DiscountDTO discount = new DiscountDTO(TEMP_PRICEDTO);
                    CompanyDTO company = new CompanyDTO(
                            so.getCustomerUuid() == null ? null : so.getCustomerUuid());
                    System.out.println("Processing SalesOffer UUID: " + so.getUuid());
                    // 2) Lines (List<SalesOfferLineDTO>), not a Stream
                    List<SalesOfferLineDTO> lines = salesOfferLineRepo.findByOfferUuid(so.getUuid())
                            .stream()
                            .map(sol -> {
                                Delivery delivery = deliveryRepo
                                        .findByUuid(sol.getDeliveryUuid())
                                        .orElse(null);
                                Address fromAddress = (delivery == null) ? null
                                        : addressRepo.findByUuid(delivery
                                                .getFromAddressUuid())
                                                .orElse(null);
                                Address toAddress = (delivery == null) ? null
                                        : addressRepo.findByUuid(delivery
                                                .getToAddressUuid())
                                                .orElse(null);
                                System.out.println("delivery: " + delivery.getUuid());
                                System.out.println("fromAddress: " + fromAddress);
                                System.out.println("toAddress: " + toAddress);
                                return new SalesOfferLineDTO(
                                        sol,
                                        new ProductDTO(
                                                productRepo.findById(sol
                                                        .getProductId())
                                                        .orElse(null),
                                                TEMP_SELLERDTO,
                                                new LocationDTO(true,
                                                        true,
                                                        new AddressDTO(fromAddress == null
                                                                ? null
                                                                : fromAddress))),
                                        TEMP_PRODUCTPRICEDTO,
                                        new DeliveryDTO(delivery,
                                                new AddressDTO(fromAddress == null
                                                        ? null
                                                        : fromAddress),
                                                new AddressDTO(toAddress == null
                                                        ? null
                                                        : toAddress),
                                                false));
                            })
                            .toList();
                    System.out.println(so.getUuid() + " has " + lines.size() + " linesTemp.");
                    // 3) Sales persons (List<SalesPersonDTO>) with Optional unwrapped
                    List<SalesPersonDTO> people = salesOfferSalesPersonRepo
                            .findByOfferUuid(so.getUuid())
                            .stream()
                            .map(link -> salesPersonRepo
                                    .findByUuid(link.getSalespersonUuid())) // Optional<SalesPerson>
                            .flatMap(Optional::stream) // Stream<SalesPerson>
                            .map(sp -> new SalesPersonDTO(sp))
                            .toList();
                    // 4) Build the SalesOfferDTO (ensure this constructor exists)
                    return new SalesOfferDTO(so, discount, company, lines, people);
                })
                .toList();
        return dtos;
    }
}
