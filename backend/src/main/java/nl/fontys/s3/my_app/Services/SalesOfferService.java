package nl.fontys.s3.my_app.Services;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.stereotype.Service;

import nl.fontys.s3.my_app.Repositories.AddressRepo;
import nl.fontys.s3.my_app.Repositories.DeliveryRepo;
import nl.fontys.s3.my_app.Repositories.DepotRepo;
import nl.fontys.s3.my_app.Repositories.ProductRepo;
import nl.fontys.s3.my_app.Repositories.SalesOfferDepotRepo;
import nl.fontys.s3.my_app.Repositories.SalesOfferLineRepo;
import nl.fontys.s3.my_app.Repositories.SalesOfferRepo;
import nl.fontys.s3.my_app.Repositories.SalesOfferSalesPersonRepo;
import nl.fontys.s3.my_app.Repositories.SalesPersonRepo;
import nl.fontys.s3.my_app.Repositories.CustomerCompany.CompanyAddressRepo;
import nl.fontys.s3.my_app.Repositories.CustomerCompany.CustomerCompanyRepo;
import nl.fontys.s3.my_app.Services.Rows.OfferSalesPersonRow;
import nl.fontys.s3.my_app.models.Address;
import nl.fontys.s3.my_app.models.CompanyAddress;
import nl.fontys.s3.my_app.models.CustomerCompany;
import nl.fontys.s3.my_app.models.Delivery;
import nl.fontys.s3.my_app.models.Depot;
import nl.fontys.s3.my_app.models.Product;
import nl.fontys.s3.my_app.models.SalesOffer;
import nl.fontys.s3.my_app.models.SalesOfferDepot;
import nl.fontys.s3.my_app.models.SalesOfferLine;
import nl.fontys.s3.my_app.models.SalesOfferSalesPerson;
import nl.fontys.s3.my_app.models.SalesPerson;
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
import nl.fontys.s3.my_app.models.dtos.SalesOffer.SalesOffersPerCountryDTO;
import nl.fontys.s3.my_app.models.dtos.SalesOffer.SalesPersonDTO;
import nl.fontys.s3.my_app.models.dtos.SalesOffer.SellerDTO;
import nl.fontys.s3.my_app.models.dtos.SalesOfferSimple.DeliverySimpleDTO;
import nl.fontys.s3.my_app.models.dtos.SalesOfferSimple.ProductSimpleDTO;
import nl.fontys.s3.my_app.models.dtos.SalesOfferSimple.SalesOfferLineSimpleDTO;
import nl.fontys.s3.my_app.models.dtos.SalesOfferSimple.SalesOfferSimpleDTO;
import nl.fontys.s3.my_app.models.dtos.SalesOfferSimple.SalesPersonSimpleDTO;
import nl.fontys.s3.my_app.models.dtos.SalesOfferWithoutLineDTO.SalesOfferWithoutLineDTO;

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
	private final CompanyAddressRepo companyAddressRepo;
	private final CustomerCompanyRepo customerCompanyRepo;
	private final SalesOfferDepotRepo salesOfferDepotRepo;
	private final DepotRepo depotRepo;

	public SalesOfferService(SalesOfferRepo salesOfferRepo,
			SalesOfferLineRepo salesOfferLineRepo,
			ProductRepo productRepo,
			AddressRepo addressRepo,
			DeliveryRepo deliveryRepo,
			SalesOfferSalesPersonRepo salesOfferSalesPersonRepo,
			SalesPersonRepo salesPersonRepo,
			CompanyAddressRepo companyAddressRepo,
			CustomerCompanyRepo customerCompanyRepo,
			SalesOfferDepotRepo salesOfferDepotRepo,
			DepotRepo depotRepo) {
		this.salesOfferRepo = salesOfferRepo;
		this.salesOfferLineRepo = salesOfferLineRepo;
		this.productRepo = productRepo;
		this.addressRepo = addressRepo;
		this.deliveryRepo = deliveryRepo;
		this.salesOfferSalesPersonRepo = salesOfferSalesPersonRepo;
		this.salesPersonRepo = salesPersonRepo;
		this.companyAddressRepo = companyAddressRepo;
		this.customerCompanyRepo = customerCompanyRepo;
		this.salesOfferDepotRepo = salesOfferDepotRepo;
		this.depotRepo = depotRepo;
	}

	// Get all SalesOffer DTOs
	public List<SalesOfferDTO> getAllSalesOffersDTO() {
		List<SalesOffer> salesOffers = salesOfferRepo.findAll();

		return this.mapSalesOffersDTO(salesOffers);
	}

    public List<SalesOfferDTO> getSalesOffersBetween(LocalDateTime start, LocalDateTime end) {
        List<SalesOffer> salesOffers = salesOfferRepo.findAllByCreatedAtBetween(start, end);
        return this.mapSalesOffersDTO(salesOffers);
    }

	// Get SalesOffer DTO by UUID
	public SalesOfferDTO getSalesOfferByUuid(String uuid) {
		SalesOffer salesOffer = salesOfferRepo.findByUuid(uuid).orElse(null);

		return this.mapSalesOfferDTO(salesOffer);
	}

	public List<SalesOfferSimpleDTO> getAllSalesOffersSimpleDTO() {
		List<SalesOffer> salesOffers = salesOfferRepo.findAll();
		return this.mapSalesOfferSimpleDTOs(salesOffers);
	}

	// // Get SalesOfferLine DTO by UUID
	// public SalesOfferLineDTO getSalesOfferLineByUuid(String uuid) {
	// SalesOfferLine salesOfferLine =
	// salesOfferLineRepo.findByLineUuid(uuid).orElse(null);
	// return this.mapSalesOfferLineDTO(salesOfferLine);
	// }

	// Get SalesOfferLines DTOs by SalesOffer UUID
	public List<SalesOfferLineDTO> getSalesOfferLinesDTOByOfferUuid(String soUuid) {
		return this.mapSalesOfferLinesDTO(salesOfferLineRepo.findByOfferUuid(soUuid));
	}

	// Get count of SalesOffers per country
	public List<SalesOffersPerCountryDTO> getSalesOffersCountPerCountry() {

		List<SalesOffersPerCountryDTO> addresses = companyAddressRepo.findAll()
				.stream()
				.map(ca -> {
					Long count = salesOfferRepo.countByCustomerUuid(ca.getCompanyUuid());
					return new SalesOffersPerCountryDTO(ca.getCountryCode(), count);
				})
				.toList();

		return addresses;
	}

	private SalesOfferDTO mapSalesOfferDTO(SalesOffer offer) {
		if (offer == null)
			return null;
		return mapSalesOffersDTO(List.of(offer)).get(0);
	}

	public List<SalesOfferWithoutLineDTO> getAllSalesOffersWithoutLines() {
		List<SalesOffer> offers = salesOfferRepo.findAll();
		if (offers.isEmpty())
			return List.of();

		// --- Collect keys from offers ---
		Set<String> offerUuids = offers.stream()
				.map(SalesOffer::getUuid)
				.collect(Collectors.toSet());

		Set<String> customerUuids = offers.stream()
				.map(SalesOffer::getCustomerUuid)
				.filter(Objects::nonNull)
				.collect(Collectors.toSet());

		// --- Bulk: customers -> name map ---
		Map<String, String> customerNameByUuid = customerCompanyRepo.findAllByUuidIn(customerUuids).stream()
				.collect(Collectors.toMap(CustomerCompany::getUuid, CustomerCompany::getName));

		// --- Bulk: salesperson links -> salesperson entities -> DTO lists per offer
		// ---
		List<SalesOfferSalesPerson> spLinks = salesOfferSalesPersonRepo.findAllByOfferUuidIn(offerUuids);

		Set<String> salesPersonUuids = spLinks.stream()
				.map(SalesOfferSalesPerson::getSalespersonUuid)
				.collect(Collectors.toSet());

		Map<String, SalesPerson> spByUuid = salesPersonRepo.findAllByUuidIn(salesPersonUuids).stream()
				.collect(Collectors.toMap(SalesPerson::getUuid, sp -> sp));

		Map<String, List<SalesPersonSimpleDTO>> salesPersonsByOffer = spLinks.stream()
				.collect(Collectors.groupingBy(
						SalesOfferSalesPerson::getOfferUuid,
						Collectors.mapping(link -> {
							SalesPerson sp = spByUuid.get(link.getSalespersonUuid());
							String name = (sp != null && sp.getName() != null) ? sp.getName() : "Unknown Salesperson";
							return new SalesPersonSimpleDTO(name);
						}, Collectors.toList())));

		// --- Bulk: depot links -> depot entities -> name per offer ---
		List<SalesOfferDepot> depotLinks = salesOfferDepotRepo.findAllByOfferUuidIn(offerUuids);

		Set<Integer> depotIds = depotLinks.stream()
				.map(SalesOfferDepot::getDepotId)
				.collect(Collectors.toSet());

		Map<Integer, Depot> depotById = depotRepo.findAllByIdIn(depotIds).stream()
				.collect(Collectors.toMap(Depot::getId, d -> d));

		// If multiple depots per offer, keep the first; adjust if you need a list
		// instead.
		Map<String, String> depotNameByOffer = depotLinks.stream()
				.collect(Collectors.toMap(
						SalesOfferDepot::getOfferUuid,
						link -> {
							Depot d = depotById.get(link.getDepotId());
							return (d != null && d.getName() != null) ? d.getName() : "Unknown Depot";
						},
						(left, right) -> left));

		// --- Map offers -> DTOs using your constructor ---
		return offers.stream()
				.map(so -> new SalesOfferWithoutLineDTO(
						so,
						customerNameByUuid.getOrDefault(so.getCustomerUuid(), "Unknown Customer"),
						salesPersonsByOffer.getOrDefault(so.getUuid(), List.of()),
						depotNameByOffer.getOrDefault(so.getUuid(), "Unknown Depot")))
				.toList();
	}

	// Service method: map many offers at once (fast path)
	public List<SalesOfferSimpleDTO> mapSalesOfferSimpleDTOs(List<SalesOffer> offers) {
		if (offers == null || offers.isEmpty())
			return List.of();

		// 1) Collect offer UUIDs
		Set<String> offerUuids = offers.stream()
				.map(SalesOffer::getUuid)
				.filter(Objects::nonNull)
				.collect(Collectors.toSet());

		// 2) Preload all lines for these offers
		List<SalesOfferLine> allLines = salesOfferLineRepo.findAllByOfferUuidIn(offerUuids);
		Map<String, List<SalesOfferLine>> linesByOffer = allLines.stream()
				.collect(Collectors.groupingBy(SalesOfferLine::getOfferUuid));

		// 3) Preload offer–salesperson links and group by offer
		List<SalesOfferSalesPerson> allLinks = salesOfferSalesPersonRepo.findAllByOfferUuidIn(offerUuids);
		Map<String, List<SalesOfferSalesPerson>> linksByOffer = allLinks.stream()
				.collect(Collectors.groupingBy(SalesOfferSalesPerson::getOfferUuid));

		// 4) Preload SalesPersons
		Set<String> salesPersonUuids = allLinks.stream()
				.map(SalesOfferSalesPerson::getSalespersonUuid)
				.filter(Objects::nonNull)
				.collect(Collectors.toSet());
		Map<String, SalesPerson> spByUuid = salesPersonUuids.isEmpty() ? Map.of()
				: salesPersonRepo.findAllByUuidIn(salesPersonUuids).stream()
						.collect(Collectors.toMap(SalesPerson::getUuid, sp -> sp));

		// 5) From lines, collect ProductIds + DeliveryUuids
		Set<Integer> productIds = allLines.stream()
				.map(SalesOfferLine::getProductId)
				.filter(Objects::nonNull)
				.collect(Collectors.toSet());
		Set<String> deliveryUuids = allLines.stream()
				.map(SalesOfferLine::getDeliveryUuid)
				.filter(Objects::nonNull)
				.collect(Collectors.toSet());

		// 6) Preload Products & Deliveries
		Map<Integer, Product> productById = productIds.isEmpty() ? Map.of()
				: productRepo.findAllByIdIn(productIds).stream()
						.collect(Collectors.toMap(Product::getId, p -> p));

		Map<String, Delivery> deliveryByUuid = deliveryUuids.isEmpty() ? Map.of()
				: deliveryRepo.findAllByUuidIn(deliveryUuids).stream()
						.collect(Collectors.toMap(Delivery::getUuid, d -> d));

		// 7) Collect destination address UUIDs (toAddress) and preload Addresses
		Set<String> toAddressUuids = deliveryByUuid.values().stream()
				.map(Delivery::getToAddressUuid)
				.filter(Objects::nonNull)
				.collect(Collectors.toSet());

		Map<String, Address> addressByUuid = toAddressUuids.isEmpty() ? Map.of()
				: addressRepo.findAllByUuidIn(toAddressUuids).stream()
						.collect(Collectors.toMap(a -> a.getUuid().toString(), a -> a)); // adapt
																							// if
																							// your
																							// Address.uuid
																							// is
																							// String

		// 8) Build DTOs (no more DB hits)
		return offers.stream().map(offer -> {
			// 8a) SalesPersons
			List<SalesPersonSimpleDTO> salesPersonDtos = linksByOffer
					.getOrDefault(offer.getUuid(), List.of()).stream()
					.map(link -> spByUuid.get(link.getSalespersonUuid()))
					.filter(Objects::nonNull)
					.map(sp -> new SalesPersonSimpleDTO(sp.getName())) // or just name
					.toList();

			// 8b) Lines -> product + delivery snippets
			List<SalesOfferLineSimpleDTO> lineDtos = linesByOffer
					.getOrDefault(offer.getUuid(), List.of()).stream()
					.map(line -> {
						Product p = line.getProductId() == null ? null
								: productById.get(line.getProductId());
						Delivery d = line.getDeliveryUuid() == null ? null
								: deliveryByUuid.get(line.getDeliveryUuid());
						Address to = (d == null || d.getToAddressUuid() == null)
								? null
								: addressByUuid.get(d.getToAddressUuid());

						ProductSimpleDTO productDto = new ProductSimpleDTO(
								p == null ? null : p.getBrand(),
								p == null ? null : p.getProductType());

						DeliverySimpleDTO deliveryDto = new DeliverySimpleDTO(
								d == null ? null : d.getIncoterm(),
								to == null ? null : to.getCountryCode());

						return new SalesOfferLineSimpleDTO(productDto, deliveryDto);
					})
					.toList();

			// 8c) Offer shell
			SalesOfferSimpleDTO dto = new SalesOfferSimpleDTO();
			dto.setUuid(offer.getUuid());
			dto.setStatus(offer.getStatusCode());
			dto.setReferenceId(offer.getReferenceId());
			dto.setExpiresAt(offer.getExpiresAt());
			dto.setCreatedAt(offer.getCreatedAt());
			dto.setUpdatedAt(offer.getUpdatedAt());
			dto.setSalesPerson(salesPersonDtos);
			dto.setSalesOfferLine(lineDtos);
			return dto;
		}).toList();
	}

	// Service: map a *list* of offers efficiently
	private List<SalesOfferDTO> mapSalesOffersDTO(List<SalesOffer> offers) {
		if (offers == null || offers.isEmpty())
			return List.of();

		// 1) Keys
		Set<String> offerUuids = offers.stream()
				.map(SalesOffer::getUuid)
				.filter(Objects::nonNull)
				.collect(Collectors.toSet());

		// 2) Preload lines for all offers in one go
		List<SalesOfferLine> allLines = salesOfferLineRepo.findAllByOfferUuidIn(offerUuids);

		// 3) Group lines by offer
		Map<String, List<SalesOfferLine>> linesByOffer = allLines.stream()
				.collect(Collectors.groupingBy(SalesOfferLine::getOfferUuid));

		// 4) Preload offer↔salesperson links once
		List<SalesOfferSalesPerson> allLinks = salesOfferSalesPersonRepo.findAllByOfferUuidIn(offerUuids);
		Map<String, List<SalesOfferSalesPerson>> linksByOffer = allLinks.stream()
				.collect(Collectors.groupingBy(SalesOfferSalesPerson::getOfferUuid));

		// 5) Preload all salespeople referenced
		Set<String> salespersonUuids = allLinks.stream()
				.map(SalesOfferSalesPerson::getSalespersonUuid)
				.filter(Objects::nonNull)
				.collect(Collectors.toSet());

		Map<String, SalesPerson> spByUuid = salespersonUuids.isEmpty() ? Map.of()
				: salesPersonRepo.findAllByUuidIn(salespersonUuids).stream()
						.collect(Collectors.toMap(SalesPerson::getUuid, sp -> sp));

		// 6) (Optional) Preload Delivery/Address/Product for all lines once,
		// then map lines -> DTOs without I/O (reusing the fast mapper from earlier)
		// Example assumes you have: mapSalesOfferLinesDTO(List<SalesOfferLine>)

		return offers.stream().map(offer -> {
			DiscountDTO discount = new DiscountDTO(TEMP_PRICEDTO);
			CompanyDTO company = new CompanyDTO(
					offer.getCustomerUuid() == null ? null : offer.getCustomerUuid());

			List<SalesOfferLine> lines = linesByOffer.getOrDefault(offer.getUuid(), List.of());
			List<SalesOfferLineDTO> lineDtos = mapSalesOfferLinesDTO(lines); // uses preloaded caches
																				// internally

			List<SalesPersonDTO> people = linksByOffer
					.getOrDefault(offer.getUuid(), List.of()).stream()
					.map(link -> spByUuid.get(link.getSalespersonUuid()))
					.filter(Objects::nonNull)
					.map(SalesPersonDTO::new)
					.toList();

			return new SalesOfferDTO(offer, discount, company, lineDtos, people);
		}).toList();
	}

	// Service method: map a *list* of lines in one pass
	private List<SalesOfferLineDTO> mapSalesOfferLinesDTO(List<SalesOfferLine> lines) {
		if (lines.isEmpty())
			return List.of();

		// 1) Collect keys
		Set<String> deliveryUuids = lines.stream()
				.map(SalesOfferLine::getDeliveryUuid)
				.filter(Objects::nonNull)
				.collect(Collectors.toSet());

		Map<String, Delivery> deliveryByUuid = deliveryUuids.isEmpty() ? Map.of()
				: deliveryRepo.findAllByUuidIn(deliveryUuids).stream()
						.collect(Collectors.toMap(Delivery::getUuid, d -> d));

		// 2) Collect address UUIDs from deliveries
		Set<String> addressUuids = deliveryByUuid.values().stream()
				.flatMap(d -> Stream.of(d.getFromAddressUuid(), d.getToAddressUuid()))
				.filter(Objects::nonNull)
				.collect(Collectors.toSet());

		Map<String, Address> addressByUuid = addressUuids.isEmpty() ? Map.of()
				: addressRepo.findAllByUuidIn(addressUuids).stream()
						.collect(Collectors.toMap(a -> a.getUuid().toString(), a -> a)); // adapt
																							// getter/type

		// 3) Collect product ids
		Set<Integer> productIds = lines.stream()
				.map(SalesOfferLine::getProductId)
				.filter(Objects::nonNull)
				.collect(Collectors.toSet());

		Map<Integer, Product> productById = productIds.isEmpty() ? Map.of()
				: productRepo.findAllByIdIn(productIds).stream()
						.collect(Collectors.toMap(Product::getId, p -> p));

		// 4) Build DTOs without more DB calls
		return lines.stream().map(sol -> {
			Delivery delivery = sol.getDeliveryUuid() == null ? null
					: deliveryByUuid.get(sol.getDeliveryUuid());
			Address fromAddress = (delivery == null || delivery.getFromAddressUuid() == null)
					? null
					: addressByUuid.get(delivery.getFromAddressUuid());
			Address toAddress = (delivery == null || delivery.getToAddressUuid() == null)
					? null
					: addressByUuid.get(delivery.getToAddressUuid());
			Product product = sol.getProductId() == null ? null : productById.get(sol.getProductId());

			ProductDTO productDTO = new ProductDTO(
					product,
					TEMP_SELLERDTO,
					new LocationDTO(true, true,
							new AddressDTO(fromAddress == null ? null : fromAddress)));

			return new SalesOfferLineDTO(
					sol,
					productDTO,
					TEMP_PRODUCTPRICEDTO,
					new DeliveryDTO(
							delivery,
							new AddressDTO(fromAddress == null ? null : fromAddress),
							new AddressDTO(toAddress == null ? null : toAddress),
							false));
		}).toList();
	}

}
