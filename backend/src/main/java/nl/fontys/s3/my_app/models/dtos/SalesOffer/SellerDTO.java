package nl.fontys.s3.my_app.models.dtos.SalesOffer;


import java.math.BigDecimal;

public class SellerDTO {
    private String companyName;
    private int depotId;
    private BigDecimal depositPercent;
    private BigDecimal depositMinimumAmount;

    public SellerDTO(String companyName, int depotId, BigDecimal depositPercent, BigDecimal depositMinimumAmount) {
        this.companyName = companyName;
        this.depotId = depotId;
        this.depositPercent = depositPercent;
        this.depositMinimumAmount = depositMinimumAmount;
    }

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }

    public int getDepotId() { return depotId; }
    public void setDepotId(int depotId) { this.depotId = depotId; }

    public BigDecimal getDepositPercent() { return depositPercent; }
    public void setDepositPercent(BigDecimal depositPercent) { this.depositPercent = depositPercent; }

    public BigDecimal getDepositMinimumAmount() { return depositMinimumAmount; }
    public void setDepositMinimumAmount(BigDecimal depositMinimumAmount) { this.depositMinimumAmount = depositMinimumAmount; }
}
