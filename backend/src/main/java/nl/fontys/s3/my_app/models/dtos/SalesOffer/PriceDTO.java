package nl.fontys.s3.my_app.models.dtos.SalesOffer;

import java.math.BigDecimal;

public class PriceDTO {
    private String currency;
    private BigDecimal amount;

    public PriceDTO() {}

    public PriceDTO(String currency, BigDecimal amount) {
        this.currency = currency;
        this.amount = amount;
    }

    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }

    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }
}
