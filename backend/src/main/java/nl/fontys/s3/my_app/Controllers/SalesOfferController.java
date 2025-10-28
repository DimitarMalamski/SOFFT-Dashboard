package nl.fontys.s3.my_app.Controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import nl.fontys.s3.my_app.Services.SalesOfferService;
import nl.fontys.s3.my_app.models.dtos.DataResponseDTO;
import nl.fontys.s3.my_app.models.dtos.SingleDataResponseDTO;
import nl.fontys.s3.my_app.models.dtos.SalesOffer.SalesOfferDTO;
import nl.fontys.s3.my_app.models.dtos.SalesOffer.SalesOfferLineDTO;
import nl.fontys.s3.my_app.models.dtos.SalesOffer.SalesOffersPerCountryDTO;

@RestController
@RequestMapping("/api/salesoffers")
public class SalesOfferController {

    private final SalesOfferService salesOfferService;

    public SalesOfferController(SalesOfferService salesOfferService) {
        this.salesOfferService = salesOfferService;
    }

    @GetMapping
    public DataResponseDTO<SalesOfferDTO> getAll() {

        List<SalesOfferDTO> dtos = salesOfferService.getAllSalesOffersDTO();

        return new DataResponseDTO<SalesOfferDTO>(dtos);
    }

    @GetMapping("/per-country")
    public DataResponseDTO<SalesOffersPerCountryDTO> getSalesOffersCountPerCountry()
    {
        List<SalesOffersPerCountryDTO> dtos = salesOfferService.getSalesOffersCountPerCountry();
        return new DataResponseDTO<SalesOffersPerCountryDTO>(dtos);
    }

    @GetMapping("/{uuid}")
    public SingleDataResponseDTO<SalesOfferDTO> getByUuid(@PathVariable String uuid) {
        SalesOfferDTO dto = salesOfferService.getSalesOfferByUuid(uuid);
        return new SingleDataResponseDTO<SalesOfferDTO>(dto);
    }

    @GetMapping("/line/{uuid}")
    public SingleDataResponseDTO<SalesOfferLineDTO> getLineByUuid(@PathVariable String uuid) {
        SalesOfferLineDTO dto = salesOfferService.getSalesOfferLineByUuid(uuid);
        return new SingleDataResponseDTO<SalesOfferLineDTO>(dto);
    }



}
