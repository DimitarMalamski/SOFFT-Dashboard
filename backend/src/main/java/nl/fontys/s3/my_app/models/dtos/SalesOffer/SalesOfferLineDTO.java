package nl.fontys.s3.my_app.models.dtos.SalesOffer;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import nl.fontys.s3.my_app.models.SalesOfferLine;

public class SalesOfferLineDTO {
    private String uuid;
    private int status;
    private LocalDateTime reservedUntil;
    private int financingType;
    private boolean isProductSeenPhysically;
    private Integer leasingCompanyId;
    private BigDecimal vatRatePercent;
    private boolean isDepositApplicable;
    private ProductDTO product;
    private ProductPriceDTO productPrice;
    private DeliveryDTO delivery;
    private List<String> agreements;

    public SalesOfferLineDTO(SalesOfferLine salesOfferLine, ProductDTO product, ProductPriceDTO productPrice,
                        DeliveryDTO delivery) {
        this.uuid = salesOfferLine.getLineUuid();
        this.status = salesOfferLine.getStatusCode(); 
        this.reservedUntil = salesOfferLine.getReservedUntil();
        this.financingType = salesOfferLine.getFinancingType();
        this.isProductSeenPhysically = salesOfferLine.getIsDepositApplicable();
        this.leasingCompanyId = salesOfferLine.getLeasingCompanyId();
        this.vatRatePercent = salesOfferLine.getVatRatePercent();
        this.isDepositApplicable = salesOfferLine.getIsDepositApplicable();
        this.product = product;
        this.productPrice = productPrice;
        this.delivery = delivery;
    }

    // Default constructor
    public SalesOfferLineDTO() {
    }

    // Getters and setters
    public String getUuid() { return uuid; }
    public void setUuid(String uuid) { this.uuid = uuid; }

    public int getStatus() { return status; }
    public void setStatus(int status) { this.status = status; }

    public LocalDateTime getReservedUntil() { return reservedUntil; }
    public void setReservedUntil(LocalDateTime reservedUntil) { this.reservedUntil = reservedUntil; }

    public int getFinancingType() { return financingType; }
    public void setFinancingType(int financingType) { this.financingType = financingType; }

    public boolean isProductSeenPhysically() { return isProductSeenPhysically; }
    public void setProductSeenPhysically(boolean productSeenPhysically) { isProductSeenPhysically = productSeenPhysically; }

    public Integer getLeasingCompanyId() { return leasingCompanyId; }
    public void setLeasingCompanyId(Integer leasingCompanyId) { this.leasingCompanyId = leasingCompanyId; }

    public BigDecimal getVatRatePercent() { return vatRatePercent; }
    public void setVatRatePercent(BigDecimal vatRatePercent) { this.vatRatePercent = vatRatePercent; }

    public boolean isDepositApplicable() { return isDepositApplicable; }
    public void setDepositApplicable(boolean depositApplicable) { isDepositApplicable = depositApplicable; }

    public ProductDTO getProduct() { return product; }
    public void setProduct(ProductDTO product) { this.product = product; }

    public ProductPriceDTO getProductPrice() { return productPrice; }
    public void setProductPrice(ProductPriceDTO productPrice) { this.productPrice = productPrice; }

    public DeliveryDTO getDelivery() { return delivery; }
    public void setDelivery(DeliveryDTO delivery) { this.delivery = delivery; }

    public List<String> getAgreements() { return agreements; }
    public void setAgreements(List<String> agreements) { this.agreements = agreements; }
}
