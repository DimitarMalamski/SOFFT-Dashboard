package nl.fontys.s3.my_app.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "sales_offer", schema = "dbo")
public class SalesOffer {

    @Id
    @Column(name = "uuid", nullable = false, columnDefinition = "uniqueidentifier")
    private UUID uuid;

    @Column(name = "customer_uuid", columnDefinition = "uniqueidentifier")
    private UUID customerUuid;

    @Column(name = "reference_id", length = 64)
    private String referenceId;

    @Column(name = "ticket_id")
    private Integer ticketId;

    @Column(name = "status_code")
    private Integer statusCode;

    @Column(name = "status_description", length = 64)
    private String statusDescription;

    @Column(name = "currency", length = 8)
    private String currency;

    @Column(name = "exchange_rate", precision = 12, scale = 6)
    private BigDecimal exchangeRate;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "expires_at")
    private LocalDateTime expiresAt;

    @Column(name = "total_price_ex_vat_amt", precision = 14, scale = 2)
    private BigDecimal totalPriceExVatAmt;

    @Column(name = "total_price_ex_vat_ccy", length = 8)
    private String totalPriceExVatCcy;

    @Column(name = "items_total_amt", precision = 14, scale = 2)
    private BigDecimal itemsTotalAmt;

    @Column(name = "discount_amt", precision = 14, scale = 2)
    private BigDecimal discountAmt;

    @Column(name = "discount_ccy", length = 8)
    private String discountCcy;

    @Column(name = "tax_amt", precision = 14, scale = 2)
    private BigDecimal taxAmt;

    // Getters and Setters
    public UUID getUuid() {
        return uuid;
    }

    public void setUuid(UUID uuid) {
        this.uuid = uuid;
    }

    public UUID getCustomerUuid() {
        return customerUuid;
    }

    public void setCustomerUuid(UUID customerUuid) {
        this.customerUuid = customerUuid;
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

    public Integer getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(Integer statusCode) {
        this.statusCode = statusCode;
    }

    public String getStatusDescription() {
        return statusDescription;
    }

    public void setStatusDescription(String statusDescription) {
        this.statusDescription = statusDescription;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public BigDecimal getExchangeRate() {
        return exchangeRate;
    }

    public void setExchangeRate(BigDecimal exchangeRate) {
        this.exchangeRate = exchangeRate;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public LocalDateTime getExpiresAt() {
        return expiresAt;
    }

    public void setExpiresAt(LocalDateTime expiresAt) {
        this.expiresAt = expiresAt;
    }

    public BigDecimal getTotalPriceExVatAmt() {
        return totalPriceExVatAmt;
    }

    public void setTotalPriceExVatAmt(BigDecimal totalPriceExVatAmt) {
        this.totalPriceExVatAmt = totalPriceExVatAmt;
    }

    public String getTotalPriceExVatCcy() {
        return totalPriceExVatCcy;
    }

    public void setTotalPriceExVatCcy(String totalPriceExVatCcy) {
        this.totalPriceExVatCcy = totalPriceExVatCcy;
    }

    public BigDecimal getItemsTotalAmt() {
        return itemsTotalAmt;
    }

    public void setItemsTotalAmt(BigDecimal itemsTotalAmt) {
        this.itemsTotalAmt = itemsTotalAmt;
    }

    public BigDecimal getDiscountAmt() {
        return discountAmt;
    }

    public void setDiscountAmt(BigDecimal discountAmt) {
        this.discountAmt = discountAmt;
    }

    public String getDiscountCcy() {
        return discountCcy;
    }

    public void setDiscountCcy(String discountCcy) {
        this.discountCcy = discountCcy;
    }

    public BigDecimal getTaxAmt() {
        return taxAmt;
    }

    public void setTaxAmt(BigDecimal taxAmt) {
        this.taxAmt = taxAmt;
    }
}
