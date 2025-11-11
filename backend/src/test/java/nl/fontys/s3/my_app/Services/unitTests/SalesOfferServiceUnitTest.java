package nl.fontys.s3.my_app.Services.unitTests;

import nl.fontys.s3.my_app.Repositories.*;
import nl.fontys.s3.my_app.Repositories.CustomerCompany.CompanyAddressRepo;
import nl.fontys.s3.my_app.Repositories.CustomerCompany.CustomerCompanyRepo;
import nl.fontys.s3.my_app.Services.SalesOfferService;
import nl.fontys.s3.my_app.models.*;
import nl.fontys.s3.my_app.models.dtos.SalesOffer.SalesOfferDTO;
import nl.fontys.s3.my_app.models.dtos.SalesOffer.SalesOfferLineDTO;
import nl.fontys.s3.my_app.models.dtos.SalesOffer.SalesOffersPerCountryDTO;
import nl.fontys.s3.my_app.models.dtos.SalesOfferSimple.SalesOfferSimpleDTO;
import nl.fontys.s3.my_app.models.dtos.SalesOfferWithoutLineDTO.SalesOfferWithoutLineDTO;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anySet;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class SalesOfferServiceUnitTest {

    @Mock private SalesOfferRepo salesOfferRepo;
    @Mock private SalesOfferLineRepo salesOfferLineRepo;
    @Mock private ProductRepo productRepo;
    @Mock private AddressRepo addressRepo;
    @Mock private DeliveryRepo deliveryRepo;
    @Mock private SalesOfferSalesPersonRepo salesOfferSalesPersonRepo;
    @Mock private SalesPersonRepo salesPersonRepo;
    @Mock private CompanyAddressRepo companyAddressRepo;
    @Mock private CustomerCompanyRepo customerCompanyRepo;
    @Mock private SalesOfferDepotRepo salesOfferDepotRepo;
    @Mock private DepotRepo depotRepo;

    @InjectMocks
    private SalesOfferService salesOfferService;

    @Test
    void testGetSalesOfferByUuid_Found() {
        SalesOffer offer = new SalesOffer();
        offer.setUuid("uuid-123");
        offer.setTicketId(123);
        offer.setStatusCode(1);
        offer.setCustomerUuid("cust-123");

        CustomerCompany customer = new CustomerCompany();
        customer.setUuid("cust-123");

        when(salesOfferRepo.findByUuid("uuid-123")).thenReturn(Optional.of(offer));
        lenient().when(customerCompanyRepo.findAllByUuidIn(anySet())).thenReturn(List.of(customer));

        SalesOfferDTO result = salesOfferService.getSalesOfferByUuid("uuid-123");

        assertNotNull(result);
        assertEquals("cust-123", result.getCompany().getUuid());
    }

    @Test
    void testGetSalesOfferByUuid_NotFound() {
        when(salesOfferRepo.findByUuid("not-exist")).thenReturn(Optional.empty());

        SalesOfferDTO result = salesOfferService.getSalesOfferByUuid("not-exist");

        assertNull(result);
    }

    @Test
    void testGetAllSalesOffersSimpleDTO_ReturnsMappedDTOs() {
        SalesOffer offer = new SalesOffer();
        offer.setUuid("offer-1");
        offer.setReferenceId("ref");
        offer.setStatusCode(2);
        offer.setCreatedAt(LocalDateTime.now());

        when(salesOfferRepo.findAll()).thenReturn(List.of(offer));
        when(salesOfferLineRepo.findAllByOfferUuidIn(anySet())).thenReturn(List.of());
        when(salesOfferSalesPersonRepo.findAllByOfferUuidIn(anySet())).thenReturn(List.of());

        List<SalesOfferSimpleDTO> result = salesOfferService.getAllSalesOffersSimpleDTO();

        assertEquals(1, result.size());
        assertEquals("offer-1", result.get(0).getUuid());
    }

    @Test
    void testGetSalesOfferLinesDTOByOfferUuid() {
        SalesOfferLine line = new SalesOfferLine();
        line.setOfferUuid("offer-1");
        line.setProductId(1);
        line.setDeliveryUuid("deliv-1");

        Delivery delivery = new Delivery();
        delivery.setUuid("deliv-1");
        delivery.setToAddressUuid("addr-1");
        delivery.setTransportDays(5);

        Address addr = new Address();
        addr.setUuid("addr-1");
        addr.setCountryCode("NL");

        Product product = new Product();
        product.setId(1);
        product.setBrand("Volvo");
        product.setProductType("Truck");
        product.setTruckId(123);
        product.setStatus(1);
        product.setMileage(50000);
        product.setEnginePower(BigDecimal.valueOf(400));

        // Mock repository calls
        when(salesOfferLineRepo.findByOfferUuid("offer-1")).thenReturn(List.of(line));
        when(deliveryRepo.findAllByUuidIn(anySet())).thenReturn(List.of(delivery));
        when(addressRepo.findAllByUuidIn(anySet())).thenReturn(List.of(addr));
        when(productRepo.findAllByIdIn(anySet())).thenReturn(List.of(product));

        List<SalesOfferLineDTO> result = salesOfferService.getSalesOfferLinesDTOByOfferUuid("offer-1");

        assertEquals(1, result.size());
        assertEquals("Volvo", result.get(0).getProduct().getBrand());
        assertEquals("NL", result.get(0).getDelivery().getToAddress().getCountryCode());
    }

    @Test
    void testGetSalesOffersCountPerCountry() {
        CompanyAddress addr = new CompanyAddress();
        addr.setCompanyUuid("c1");
        addr.setCountryCode("NL");

        when(companyAddressRepo.findAll()).thenReturn(List.of(addr));
        when(salesOfferRepo.countByCustomerUuid("c1")).thenReturn(5L);

        List<SalesOffersPerCountryDTO> result = salesOfferService.getSalesOffersCountPerCountry();

        assertEquals(1, result.size());
        assertEquals("NL", result.get(0).getCountryCode());
        assertEquals(5L, result.get(0).getOfferCount());
    }

    @Test
    void testGetAllSalesOffersWithoutLines() {
        SalesOffer offer = new SalesOffer();
        offer.setUuid("offer-1");
        offer.setCustomerUuid("cust-1");
        offer.setTotalPriceExVatAmt(new BigDecimal("100.00"));


        CustomerCompany customer = new CustomerCompany();
        customer.setUuid("cust-1");
        customer.setName("CustomerX");

        SalesOfferSalesPerson link = new SalesOfferSalesPerson();
        link.setOfferUuid("offer-1");
        link.setSalespersonUuid("sp1");

        SalesPerson sp = new SalesPerson();
        sp.setUuid("sp1");
        sp.setName("John Doe");

        SalesOfferDepot depotLink = new SalesOfferDepot();
        depotLink.setSalesOfferUuid("offer-1");
        depotLink.setDepotId(11);

        Depot depot = new Depot();
        depot.setId(11);
        depot.setName("Main Depot");

        when(salesOfferRepo.findAll()).thenReturn(List.of(offer));
        when(customerCompanyRepo.findAllByUuidIn(anySet())).thenReturn(List.of(customer));
        when(salesOfferSalesPersonRepo.findAllByOfferUuidIn(anySet())).thenReturn(List.of(link));
        when(salesPersonRepo.findAllByUuidIn(anySet())).thenReturn(List.of(sp));
        when(salesOfferDepotRepo.findAllByOfferUuidIn(anySet())).thenReturn(List.of(depotLink));
        when(depotRepo.findAllByIdIn(anySet())).thenReturn(List.of(depot));

        List<SalesOfferWithoutLineDTO> result = salesOfferService.getAllSalesOffersWithoutLines();

        assertEquals(1, result.size());
        SalesOfferWithoutLineDTO dto = result.get(0);
        assertEquals("CustomerX", dto.getCustomerCompanyName());
        assertEquals("Main Depot", dto.getDepotName());
        assertEquals("John Doe", dto.getSalesPersons().get(0).getName());
    }
}