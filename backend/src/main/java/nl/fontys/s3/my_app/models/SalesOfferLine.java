package nl.fontys.s3.my_app.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "sales_offer_line", schema = "dbo")
public class SalesOfferLine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "line_uuid", columnDefinition = "char(36)", unique = true)
    private String lineUuid;

    @Column(name = "offer_uuid", columnDefinition = "char(36)")
    private String offerUuid;

    @Column(name = "product_id")
    private Integer productId;

    @Column(name = "delivery_uuid", columnDefinition = "char(36)")
    private String deliveryUuid;

    @Column(name = "status_code")
    private Integer statusCode;

    @Column(name = "reserved_until")
    private LocalDateTime reservedUntil;

    @Column(name = "financing_type")
    private Integer financingType;

    @Column(name = "is_product_seen_physically")
    private Boolean isProductSeenPhysically;

    @Column(name = "leasing_company_id")
    private Integer leasingCompanyId;

    @Column(name = "is_deposit_applicable")
    private Boolean isDepositApplicable;

    @Column(name = "vat_rate_percent", precision = 7, scale = 2)
    private BigDecimal vatRatePercent;

    @Column(name = "product_price_amt", precision = 14, scale = 2)
    private BigDecimal productPriceAmt;

    @Column(name = "product_price_ccy", length = 8)
    private String productPriceCcy;

    @Column(name = "note", columnDefinition = "text")
    private String note;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLineUuid() {
        return lineUuid;
    }

    public void setLineUuid(String lineUuid) {
        this.lineUuid = lineUuid;
    }

    public String getOfferUuid() {
        return offerUuid;
    }

    public void setOfferUuid(String offferUuid) {
        this.offerUuid = offferUuid;
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public String getDeliveryUuid() {
        return deliveryUuid;
    }

    public void setDeliveryUuid(String deliveryUuid) {
        this.deliveryUuid = deliveryUuid;
    }

    public Integer getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(Integer statusCode) {
        this.statusCode = statusCode;
    }

    public LocalDateTime getReservedUntil() {
        return reservedUntil;
    }

    public void setReservedUntil(LocalDateTime reservedUntil) {
        this.reservedUntil = reservedUntil;
    }

    public Integer getFinancingType() {
        return financingType;
    }

    public void setFinancingType(Integer financingType) {
        this.financingType = financingType;
    }

    public Boolean getIsProductSeenPhysically() {
        return isProductSeenPhysically;
    }

    public void setIsProductSeenPhysically(Boolean isProductSeenPhysically) {
        this.isProductSeenPhysically = isProductSeenPhysically;
    }

    public Integer getLeasingCompanyId() {
        return leasingCompanyId;
    }

    public void setLeasingCompanyId(Integer leasingCompanyId) {
        this.leasingCompanyId = leasingCompanyId;
    }

    public Boolean getIsDepositApplicable() {
        return isDepositApplicable;
    }

    public void setIsDepositApplicable(Boolean isDepositApplicable) {
        this.isDepositApplicable = isDepositApplicable;
    }

    public BigDecimal getVatRatePercent() {
        return vatRatePercent;
    }

    public void setVatRatePercent(BigDecimal vatRatePercent) {
        this.vatRatePercent = vatRatePercent;
    }

    public BigDecimal getProductPriceAmt() {
        return productPriceAmt;
    }

    public void setProductPriceAmt(BigDecimal productPriceAmt) {
        this.productPriceAmt = productPriceAmt;
    }

    public String getProductPriceCcy() {
        return productPriceCcy;
    }

    public void setProductPriceCcy(String productPriceCcy) {
        this.productPriceCcy = productPriceCcy;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}
