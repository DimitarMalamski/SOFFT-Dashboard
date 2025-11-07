package nl.fontys.s3.my_app.models.dtos.SalesOfferWithoutLineDTO;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import nl.fontys.s3.my_app.models.SalesOffer;
import nl.fontys.s3.my_app.models.dtos.SalesOfferSimple.SalesPersonSimpleDTO;

public class SalesOfferWithoutLineDTO {
    private String uuid;
    private String referenceId;
    private Integer ticketId;
    private String status;
    private String customerCompanyName;
    private List<SalesPersonSimpleDTO> salesPersons;
    private String depotName;
    private String currency;
    private BigDecimal totalPrice;
    private BigDecimal discount;
    private BigDecimal tax;
    private LocalDateTime createdAt;
    private LocalDateTime expiresAt;

    public SalesOfferWithoutLineDTO() {
    }

    public SalesOfferWithoutLineDTO(String uuid, String referenceId, Integer ticketId, String status,
            String customerCompanyName, List<SalesPersonSimpleDTO> salesPersons, String depotName,
            String currency, BigDecimal totalPrice, BigDecimal discount, BigDecimal tax,
            LocalDateTime createdAt, LocalDateTime expiresAt) {
        this.uuid = uuid;
        this.referenceId = referenceId;
        this.ticketId = ticketId;
        this.status = status;
        this.customerCompanyName = customerCompanyName;
        this.salesPersons = salesPersons;
        this.depotName = depotName;
        this.currency = currency;
        this.totalPrice = totalPrice;
        this.discount = discount;
        this.tax = tax;
        this.createdAt = createdAt;
        this.expiresAt = expiresAt;
    }

    public SalesOfferWithoutLineDTO(SalesOffer salesOffer, String customerCompanyName,
            List<SalesPersonSimpleDTO> salesPersons,
            String depotName) {
        this.uuid = salesOffer.getUuid();
        this.referenceId = salesOffer.getReferenceId();
        this.ticketId = salesOffer.getTicketId();
        this.status = salesOffer.getStatusDescription();
        this.customerCompanyName = customerCompanyName;
        this.salesPersons = salesPersons;
        this.depotName = depotName;
        this.currency = salesOffer.getCurrency();
        this.totalPrice = salesOffer.getTotalPriceExVatAmt();
        this.discount = salesOffer.getDiscountAmt();
        this.tax = salesOffer.getTotalPriceExVatAmt()
                .multiply(new BigDecimal("0.21")); // Assuming a fixed 21% tax rate for example
        this.createdAt = salesOffer.getCreatedAt();
        this.expiresAt = salesOffer.getExpiresAt();
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public String getReferenceId() {
        return referenceId;
    }

    public void setReferenceId(String referenceId) {
        this.referenceId = referenceId;
    }

    public Integer getTicketId() {
        return ticketId;
    }

    public void setTicketId(Integer ticketId) {
        this.ticketId = ticketId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCustomerCompanyName() {
        return customerCompanyName;
    }

    public void setCustomerCompanyName(String customerCompanyName) {
        this.customerCompanyName = customerCompanyName;
    }

    public List<SalesPersonSimpleDTO> getSalesPersonName() {
        return salesPersons;
    }

    public void setSalesPersonName(List<SalesPersonSimpleDTO> salesPersons) {
        this.salesPersons = salesPersons;
    }

    public String getDepotName() {
        return depotName;
    }

    public void setDepotName(String depotName) {
        this.depotName = depotName;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

    public BigDecimal getDiscount() {
        return discount;
    }

    public void setDiscount(BigDecimal discount) {
        this.discount = discount;
    }

    public BigDecimal getTax() {
        return tax;
    }

    public void setTax(BigDecimal tax) {
        this.tax = tax;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getExpiresAt() {
        return expiresAt;
    }

    public void setExpiresAt(LocalDateTime expiresAt) {
        this.expiresAt = expiresAt;
    }
}
