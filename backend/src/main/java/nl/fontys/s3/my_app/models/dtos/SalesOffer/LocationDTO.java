package nl.fontys.s3.my_app.models.dtos.SalesOffer;


import com.fasterxml.jackson.annotation.JsonProperty;

public class LocationDTO {
    @JsonProperty("isAllowToPickup")
    private boolean allowToPickup;

    @JsonProperty("isAllowToView")
    private boolean allowToView;

    private AddressDTO address;

    public LocationDTO() { }

    public LocationDTO(boolean allowToPickup, boolean allowToView, AddressDTO address) {
        this.allowToPickup = allowToPickup;
        this.allowToView = allowToView;
        this.address = address;
    }

    public boolean isAllowToPickup() { return allowToPickup; }
    public void setAllowToPickup(boolean allowToPickup) { this.allowToPickup = allowToPickup; }

    public boolean isAllowToView() { return allowToView; }
    public void setAllowToView(boolean allowToView) { this.allowToView = allowToView; }

    public AddressDTO getAddress() { return address; }
    public void setAddress(AddressDTO address) { this.address = address; }
}
