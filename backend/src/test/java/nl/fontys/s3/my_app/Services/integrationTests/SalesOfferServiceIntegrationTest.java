package nl.fontys.s3.my_app.Services.integrationTests;

import nl.fontys.s3.my_app.Repositories.*;
import nl.fontys.s3.my_app.Repositories.CustomerCompany.CompanyAddressRepo;
import nl.fontys.s3.my_app.Repositories.CustomerCompany.CustomerCompanyRepo;
import nl.fontys.s3.my_app.Services.SalesOfferService;
import nl.fontys.s3.my_app.models.CustomerCompany;
import nl.fontys.s3.my_app.models.SalesOffer;
import nl.fontys.s3.my_app.models.dtos.SalesOffer.SalesOfferDTO;
import nl.fontys.s3.my_app.models.dtos.SalesOfferWithoutLineDTO.SalesOfferWithoutLineDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
class SalesOfferServiceIntegrationTest {

    @Autowired private SalesOfferRepo salesOfferRepo;
    @Autowired private SalesOfferLineRepo salesOfferLineRepo;
    @Autowired private ProductRepo productRepo;
    @Autowired private AddressRepo addressRepo;
    @Autowired private DeliveryRepo deliveryRepo;
    @Autowired private SalesOfferSalesPersonRepo salesOfferSalesPersonRepo;
    @Autowired private SalesPersonRepo salesPersonRepo;
    @Autowired private CompanyAddressRepo companyAddressRepo;
    @Autowired private CustomerCompanyRepo customerCompanyRepo;
    @Autowired private SalesOfferDepotRepo salesOfferDepotRepo;
    @Autowired private DepotRepo depotRepo;

    @Autowired private SalesOfferService salesOfferService;

    private SalesOffer offer;
    private CustomerCompany customer;

    @BeforeEach
    void setup() {
        salesOfferSalesPersonRepo.deleteAll();
        salesOfferDepotRepo.deleteAll();
        salesOfferLineRepo.deleteAll();
        salesOfferRepo.deleteAll();
        productRepo.deleteAll();
        addressRepo.deleteAll();
        deliveryRepo.deleteAll();
        salesPersonRepo.deleteAll();
        customerCompanyRepo.deleteAll();
        companyAddressRepo.deleteAll();
        depotRepo.deleteAll();

        customer = new CustomerCompany();
        customer.setUuid("cust-1");
        customer.setName("Test Customer");
        customerCompanyRepo.save(customer);

        offer = new SalesOffer();
        offer.setUuid("offer-1");
        offer.setCustomerUuid(customer.getUuid());
        offer.setTotalPriceExVatAmt(new BigDecimal("100"));
        offer.setStatusCode(1);
        offer.setCreatedAt(LocalDateTime.now());
        offer.setTicketId(0);
        salesOfferRepo.save(offer);
    }

    @Test
    void testGetSalesOfferByUuid_returnsDTO() {
        SalesOfferDTO dto = salesOfferService.getSalesOfferByUuid("offer-1");

        assertNotNull(dto);
        assertEquals("offer-1", dto.getUuid().trim());
        assertEquals("cust-1", dto.getCompany().getUuid().trim());
    }

    @Test
    void testGetAllSalesOffersDTO_returnsList() {
        List<SalesOfferDTO> list = salesOfferService.getAllSalesOffersDTO();

        assertEquals(1, list.size());
        assertEquals("offer-1", list.get(0).getUuid().trim());
    }

    @Test
    void testGetAllSalesOffersWithoutLines_returnsDTOWithCustomerName() {
        List<?> result = salesOfferService.getAllSalesOffersWithoutLines();

        assertEquals(1, result.size());
        assertEquals("Test Customer", ((SalesOfferWithoutLineDTO) result.get(0)).getCustomerCompanyName());
    }
}