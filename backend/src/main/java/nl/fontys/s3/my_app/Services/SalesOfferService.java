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
import nl.fontys.s3.my_app.models.SalesOffer;
import nl.fontys.s3.my_app.models.SalesOfferLine;
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
        private static final ProductPriceDTO TEMP_PRODUCTPRICEDTO = new ProductPriceDTO("Euro",
                        BigDecimal.valueOf(100));

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
                                .map(this::mapSalesOfferDTO)
                                .toList();
                return dtos;
        }

        public SalesOfferDTO getSalesOfferByUuid(String uuid) {
                SalesOffer salesOffer = salesOfferRepo.findByUuid(uuid).orElse(null);

                return this.mapSalesOfferDTO(salesOffer);
        }

        // Get SalesOfferLine DTO by UUID
        public SalesOfferLineDTO getSalesOfferLineByUuid(String uuid) {
                SalesOfferLine salesOfferLine = salesOfferLineRepo.findByLineUuid(uuid).orElse(null);
                return this.mapSalesOfferLineDTO(salesOfferLine);
        }

        // Get SalesOfferLines DTOs by SalesOffer UUID
        public List<SalesOfferLineDTO> getSalesOfferLinesDTOByOfferUuid(SalesOffer so) {
                List<SalesOfferLineDTO> lines = salesOfferLineRepo.findByOfferUuid(so.getUuid())
                                .stream()
                                .map(this::mapSalesOfferLineDTO)
                                .toList();
                return lines;
        }

        // Map SalesOffer to SalesOfferDTO
        private SalesOfferDTO mapSalesOfferDTO(SalesOffer salesOffers) {

                DiscountDTO discount = new DiscountDTO(TEMP_PRICEDTO);
                CompanyDTO company = new CompanyDTO(
                                salesOffers.getCustomerUuid() == null ? null : salesOffers.getCustomerUuid());
                List<SalesOfferLineDTO> lines = getSalesOfferLinesDTOByOfferUuid(salesOffers);
                List<SalesPersonDTO> people = salesOfferSalesPersonRepo
                                .findByOfferUuid(salesOffers.getUuid())
                                .stream()
                                .map(link -> salesPersonRepo.findByUuid(link.getSalespersonUuid()))
                                .flatMap(Optional::stream)
                                .map(sp -> new SalesPersonDTO(sp))
                                .toList();

                return new SalesOfferDTO(salesOffers, discount, company, lines, people);

        }

        // Map SalesOfferLine to SalesOfferLineDTO
        private SalesOfferLineDTO mapSalesOfferLineDTO(SalesOfferLine salesOfferLine) {

                Delivery delivery = deliveryRepo.findByUuid(salesOfferLine.getDeliveryUuid()).orElse(null);
                Address fromAddress = (delivery == null) ? null
                                : addressRepo.findByUuid(delivery.getFromAddressUuid()).orElse(null);
                Address toAddress = (delivery == null) ? null
                                : addressRepo.findByUuid(delivery.getToAddressUuid()).orElse(null);
                ProductDTO productDTO = new ProductDTO(productRepo.findById(salesOfferLine.getProductId()).orElse(null),
                                TEMP_SELLERDTO,
                                new LocationDTO(true, true, new AddressDTO(fromAddress == null ? null : fromAddress)));

                SalesOfferLineDTO salesOfferLineDTO = new SalesOfferLineDTO(
                                salesOfferLine,
                                productDTO,
                                TEMP_PRODUCTPRICEDTO,
                                new DeliveryDTO(delivery, new AddressDTO(fromAddress == null ? null : fromAddress),
                                                new AddressDTO(toAddress == null ? null : toAddress),
                                                false));

                return salesOfferLineDTO;
        }
}
