package nl.fontys.s3.my_app.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Table(name = "delivery", schema = "dbo")
public class Delivery {

    @Id
    @Column(name = "uuid", nullable = false, columnDefinition = "uniqueidentifier")
    private UUID uuid;

    @Column(name = "incoterm", length = 50)
    private String incoterm;

    @Column(name = "transport_days")
    private Integer transportDays;

    @Column(name = "price", precision = 10, scale = 2)
    private BigDecimal price;

    // --- Foreign Keys ---
    @ManyToOne
    @JoinColumn(name = "from_address_uuid")
    private Address fromAddress;

    @ManyToOne
    @JoinColumn(name = "to_address_uuid")
    private Address toAddress;

    @Column(name = "is_custom_address")
    private Boolean isCustomAddress;

    // Getters and Setters
    public UUID getUuid() {
        return uuid;
    }

    public void setUuid(UUID uuid) {
        this.uuid = uuid;
    }

    public String getIncoterm() {
        return incoterm;
    }

    public void setIncoterm(String incoterm) {
        this.incoterm = incoterm;
    }

    public Integer getTransportDays() {
        return transportDays;
    }

    public void setTransportDays(Integer transportDays) {
        this.transportDays = transportDays;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Address getFromAddress() {
        return fromAddress;
    }

    public void setFromAddress(Address fromAddress) {
        this.fromAddress = fromAddress;
    }

    public Address getToAddress() {
        return toAddress;
    }

    public void setToAddress(Address toAddress) {
        this.toAddress = toAddress;
    }

    public Boolean getIsCustomAddress() {
        return isCustomAddress;
    }

    public void setIsCustomAddress(Boolean isCustomAddress) {
        this.isCustomAddress = isCustomAddress;
    }
}