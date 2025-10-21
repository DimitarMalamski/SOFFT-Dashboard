package nl.fontys.s3.my_app.models.dtos.SalesOffer;

public class DiscountDTO {
    private PriceDTO price;

    public DiscountDTO() {}

    public DiscountDTO(PriceDTO price) {
        this.price = price;
    }

    public PriceDTO getPrice() { return price; }
    public void setPrice(PriceDTO price) { this.price = price; }
}
