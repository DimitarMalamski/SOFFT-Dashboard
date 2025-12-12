package nl.fontys.s3.my_app.Services.unitTests;

import nl.fontys.s3.my_app.Repositories.*;
import nl.fontys.s3.my_app.models.*;
import nl.fontys.s3.my_app.Services.ProductService;
import nl.fontys.s3.my_app.models.dtos.SalesOffer.ProductDTO;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProductServiceUnitTest {

    @Mock private ProductRepo productRepo;
    @Mock private ProductSellerRepo productSellerRepo;
    @Mock private AddressRepo addressRepo;
    @Mock private DepotRepo depotRepo;

    @InjectMocks
    private ProductService productService;

    @Test
    void testGetProductById_FindsProduct() {

        Product product = new Product();
        product.setId(1);
        product.setBrand("Volvo");

        when(productRepo.findById(1)).thenReturn(Optional.of(product));

        ProductSeller ps = new ProductSeller();
        ps.setProductId(1);
        ps.setCompanyName("TestCompany");
        ps.setAddressUuid("UUID-10");
        ps.setDepotId(5);

        // REQUIRED FIELDS – your service depends on these!!
        ps.setIsAllowToPickup(true);
        ps.setIsAllowToView(true);

        when(productSellerRepo.findById(1)).thenReturn(Optional.of(ps));

        Address address = new Address();
        address.setUuid("UUID-10");
        address.setStreet("Main St");

        when(addressRepo.findByUuid("UUID-10")).thenReturn(Optional.of(address));

        ProductDTO result = productService.getProductById(1);

        assertNotNull(result);
        assertEquals("Volvo", result.getBrand());
        assertEquals("TestCompany", result.getSeller().getCompanyName());
        assertEquals("Main St", result.getLocation().getAddress().getStreet());
    }

    @Test
    void testAddressFallback_UsesDepotAddressWhenSellerHasNoAddress() {

        Product product = new Product();
        product.setId(2);
        product.setBrand("DAF");

        when(productRepo.findById(2)).thenReturn(Optional.of(product));

        ProductSeller ps = new ProductSeller();
        ps.setProductId(2);
        ps.setDepotId(7);
        ps.setAddressUuid(null);

        // REQUIRED FIELDS AGAIN
        ps.setIsAllowToPickup(true);
        ps.setIsAllowToView(true);

        when(productSellerRepo.findById(2)).thenReturn(Optional.of(ps));

        Depot depot = new Depot();
        depot.setId(7);
        depot.setAddressUuid("UUID-20");

        when(depotRepo.findById(7L)).thenReturn(Optional.of(depot));

        Address depotAddress = new Address();
        depotAddress.setUuid("UUID-20");
        depotAddress.setStreet("Depot Road 5");

        when(addressRepo.findByUuid("UUID-20")).thenReturn(Optional.of(depotAddress));

        ProductDTO result = productService.getProductById(2);

        assertNotNull(result);
        assertEquals("Depot Road 5", result.getLocation().getAddress().getStreet());
    }


    @Test
    void testProductNotFound() {
        when(productRepo.findById(999)).thenReturn(Optional.empty());
        assertThrows(RuntimeException.class, () -> productService.getProductById(999));
    }
}
