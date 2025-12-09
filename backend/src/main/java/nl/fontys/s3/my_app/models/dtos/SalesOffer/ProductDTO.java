package nl.fontys.s3.my_app.models.dtos.SalesOffer;

import java.math.BigDecimal;
import java.time.LocalDate;

import nl.fontys.s3.my_app.models.Product;

public class ProductDTO {
    private long id;
    private long truckId;
    private String productType;
    private String brand;
    private String model;
    private String type;
    private String configuration;
    private String imageUrl;
    private int status;
    private String color;
    private LocalDate firstRegistrationDate;
    private LocalDate productionDate;
    private int mileage;
    private BigDecimal enginePower;
    private String licensePlate;
    private String vin;
    private SellerDTO seller;
    private LocationDTO location;


    public ProductDTO(Product product, SellerDTO seller, LocationDTO location) {

        if (product == null) {
            product = new Product();
        }

        this.id = product.getId() != null ? product.getId() : 0;
        this.truckId = product.getTruckId() != null ? product.getTruckId() : 0;
        this.productType = product.getProductType();
        this.brand = product.getBrand();
        this.model = product.getModel();
        this.type = product.getTypeCode();
        this.configuration = product.getConfiguration();
        this.imageUrl = product.getImageUrl();
        this.status = product.getStatus() != null ? product.getStatus() : 0;
        this.color = product.getColor();
        this.firstRegistrationDate = product.getFirstRegistrationDate();
        this.productionDate = product.getProductionDate();
        this.mileage = product.getMileage() != null ? product.getMileage() : 0;
        this.enginePower = product.getEnginePower();
        this.licensePlate = product.getLicensePlate();
        this.vin = product.getVin();
        this.seller = seller;
        this.location = location;
    }


    public ProductDTO() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getTruckId() {
        return truckId;
    }

    public void setTruckId(long truckId) {
        this.truckId = truckId;
    }

    public String getProductType() {
        return productType;
    }

    public void setProductType(String productType) {
        this.productType = productType;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getConfiguration() {
        return configuration;
    }

    public void setConfiguration(String configuration) {
        this.configuration = configuration;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public LocalDate getFirstRegistrationDate() {
        return firstRegistrationDate;
    }

    public void setFirstRegistrationDate(LocalDate firstRegistrationDate) {
        this.firstRegistrationDate = firstRegistrationDate;
    }

    public LocalDate getProductionDate() {
        return productionDate;
    }

    public void setProductionDate(LocalDate productionDate) {
        this.productionDate = productionDate;
    }

    public int getMileage() {
        return mileage;
    }

    public void setMileage(int mileage) {
        this.mileage = mileage;
    }

    public BigDecimal getEnginePower() {
        return enginePower;
    }

    public void setEnginePower(BigDecimal enginePower) {
        this.enginePower = enginePower;
    }

    public String getLicensePlate() {
        return licensePlate;
    }

    public void setLicensePlate(String licensePlate) {
        this.licensePlate = licensePlate;
    }

    public String getVin() {
        return vin;
    }

    public void setVin(String vin) {
        this.vin = vin;
    }

    public SellerDTO getSeller() {
        return seller;
    }

    public void setSeller(SellerDTO seller) {
        this.seller = seller;
    }

    public LocationDTO getLocation() {
        return location;
    }

    public void setLocation(LocationDTO location) {
        this.location = location;
    }
}
