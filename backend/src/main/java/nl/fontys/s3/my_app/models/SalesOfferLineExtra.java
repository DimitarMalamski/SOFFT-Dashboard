package nl.fontys.s3.my_app.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.math.BigDecimal;

@Entity
@Table(name = "sales_offer_line_extra", schema = "dbo")
public class SalesOfferLineExtra {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "line_id")
    private Long lineId;

    @Column(name = "extra_type", length = 16)
    private String extraType;

    @Column(name = "label", length = 255)
    private String label;

    @Column(name = "text", columnDefinition = "text")
    private String text;

    @Column(name = "original_price_amt", precision = 14, scale = 2)
    private BigDecimal originalPriceAmt;

    @Column(name = "original_price_ccy", length = 8)
    private String originalPriceCcy;

    @Column(name = "price_amt", precision = 14, scale = 2)
    private BigDecimal priceAmt;

    @Column(name = "price_ccy", length = 8)
    private String priceCcy;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getLineId() {
        return lineId;
    }

    public void setLineId(Long lineId) {
        this.lineId = lineId;
    }

    public String getExtraType() {
        return extraType;
    }

    public void setExtraType(String extraType) {
        this.extraType = extraType;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public BigDecimal getOriginalPriceAmt() {
        return originalPriceAmt;
    }

    public void setOriginalPriceAmt(BigDecimal originalPriceAmt) {
        this.originalPriceAmt = originalPriceAmt;
    }

    public String getOriginalPriceCcy() {
        return originalPriceCcy;
    }

    public void setOriginalPriceCcy(String originalPriceCcy) {
        this.originalPriceCcy = originalPriceCcy;
    }

    public BigDecimal getPriceAmt() {
        return priceAmt;
    }

    public void setPriceAmt(BigDecimal priceAmt) {
        this.priceAmt = priceAmt;
    }

    public String getPriceCcy() {
        return priceCcy;
    }

    public void setPriceCcy(String priceCcy) {
        this.priceCcy = priceCcy;
    }
}
