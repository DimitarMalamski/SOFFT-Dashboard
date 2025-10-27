package nl.fontys.s3.my_app.models.dtos.SalesOffer;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import nl.fontys.s3.my_app.models.SalesOffer;

public class SalesOfferDTO {

    private String uuid;
    private long ticketId;
    private String referenceId;
    private int status;
    private LocalDateTime expiresAt;
    private String currency;
    private BigDecimal exchangeRate;
    private DiscountDTO discount;
    private CompanyDTO company;
    private List<SalesOfferLineDTO> salesOfferLine;
    private List<SalesPersonDTO> salesPersons;

    public SalesOfferDTO() {
    }
    public SalesOfferDTO(SalesOffer salesOffer,
                         DiscountDTO discount, CompanyDTO company,
                         List<SalesOfferLineDTO> salesOfferLine,
                         List<SalesPersonDTO> salesPersons) {
        this.uuid = salesOffer.getUuid();
        this.ticketId = salesOffer.getTicketId();
        this.referenceId = salesOffer.getReferenceId();
        this.status = salesOffer.getStatusCode();
        this.expiresAt = salesOffer.getExpiresAt();
        this.currency = salesOffer.getCurrency();
        this.exchangeRate = salesOffer.getExchangeRate();
        this.discount = discount;
        this.company = company;
        this.salesOfferLine = salesOfferLine;
        this.salesPersons = salesPersons;
    }

    // Getters and setters
    public String getUuid() { return uuid; }
    public void setUuid(String uuid) { this.uuid = uuid; }

    public long getTicketId() { return ticketId; }
    public void setTicketId(long ticketId) { this.ticketId = ticketId; }

    public String getReferenceId() { return referenceId; }
    public void setReferenceId(String referenceId) { this.referenceId = referenceId; }

    public int getStatus() { return status; }
    public void setStatus(int status) { this.status = status; }

    public LocalDateTime getExpiresAt() { return expiresAt; }
    public void setExpiresAt(LocalDateTime expiresAt) { this.expiresAt = expiresAt; }

    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }

    public BigDecimal getExchangeRate() { return exchangeRate; }
    public void setExchangeRate(BigDecimal exchangeRate) { this.exchangeRate = exchangeRate; }

    public DiscountDTO getDiscount() { return discount; }
    public void setDiscount(DiscountDTO discount) { this.discount = discount; }

    public CompanyDTO getCompany() { return company; }
    public void setCompany(CompanyDTO company) { this.company = company; }

    public List<SalesOfferLineDTO> getSalesOfferLine() { return salesOfferLine; }
    public void setSalesOfferLine(List<SalesOfferLineDTO> salesOfferLine) { this.salesOfferLine = salesOfferLine; }

    public List<SalesPersonDTO> getSalesPersons() { return salesPersons; }
    public void setSalesPersons(List<SalesPersonDTO> salesPersons) { this.salesPersons = salesPersons; }
}
