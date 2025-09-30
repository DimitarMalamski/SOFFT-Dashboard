package nl.fontys.s3.my_app.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Table(name = "sales_offer_line", schema = "dbo")
public class SalesOfferLine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "line_uuid", columnDefinition = "uniqueidentifier", nullable = false)
    private UUID lineUuid;

    @ManyToOne
    @JoinColumn(name = "offer_uuid")
    private SalesOffer salesOffer;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "delivery_uuid")
    private Delivery delivery;

    @Column(name = "status_code")
    private Integer statusCode;

    @Column(name = "vat_rate_percent", precision = 5, scale = 2)
    private BigDecimal vatRatePercent;

    @Column(name = "product_price_amt", precision = 10, scale = 2)
    private BigDecimal productPriceAmt;

    @Column(name = "product_price_ccy", length = 10)
    private String productPriceCcy;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UUID getLineUuid() {
        return lineUuid;
    }

    public void setLineUuid(UUID lineUuid) {
        this.lineUuid = lineUuid;
    }

    public SalesOffer getSalesOffer() {
        return salesOffer;
    }

    public void setSalesOffer(SalesOffer salesOffer) {
        this.salesOffer = salesOffer;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Delivery getDelivery() {
        return delivery;
    }

    public void setDelivery(Delivery delivery) {
        this.delivery = delivery;
    }

    public Integer getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(Integer statusCode) {
        this.statusCode = statusCode;
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
}