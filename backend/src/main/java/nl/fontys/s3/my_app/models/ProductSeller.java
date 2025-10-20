package nl.fontys.s3.my_app.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.math.BigDecimal;

@Entity
@Table(name = "product_seller", schema = "dbo")
public class ProductSeller {

    @Id
    @Column(name = "product_id", nullable = false)
    private Integer productId;

    @Column(name = "company_name", length = 255)
    private String companyName;

    @Column(name = "depot_id")
    private Integer depotId;

    @Column(name = "deposit_percent", precision = 6, scale = 2)
    private BigDecimal depositPercent;

    @Column(name = "deposit_min_amount", precision = 14, scale = 2)
    private BigDecimal depositMinAmount;

    @Column(name = "is_allow_to_pickup")
    private Boolean isAllowToPickup;

    @Column(name = "is_allow_to_view")
    private Boolean isAllowToView;

    @Column(name = "address_uuid", columnDefinition = "char(36)")
    private String addressUuid;

    // Getters and Setters
    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public Integer getDepotId() {
        return depotId;
    }

    public void setDepotId(Integer depotId) {
        this.depotId = depotId;
    }

    public BigDecimal getDepositPercent() {
        return depositPercent;
    }

    public void setDepositPercent(BigDecimal depositPercent) {
        this.depositPercent = depositPercent;
    }

    public BigDecimal getDepositMinAmount() {
        return depositMinAmount;
    }

    public void setDepositMinAmount(BigDecimal depositMinAmount) {
        this.depositMinAmount = depositMinAmount;
    }

    public Boolean getIsAllowToPickup() {
        return isAllowToPickup;
    }

    public void setIsAllowToPickup(Boolean isAllowToPickup) {
        this.isAllowToPickup = isAllowToPickup;
    }

    public Boolean getIsAllowToView() {
        return isAllowToView;
    }

    public void setIsAllowToView(Boolean isAllowToView) {
        this.isAllowToView = isAllowToView;
    }

    public String getAddressUuid() {
        return addressUuid;
    }

    public void setAddressUuid(String addressUuid) {
        this.addressUuid = addressUuid;
    }
}
