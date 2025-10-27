package nl.fontys.s3.my_app.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "sales_offer_depot", schema = "dbo")
public class SalesOfferDepot {

    @Id
    @Column(name = "offer_uuid", nullable = false, columnDefinition = "char(36)")
    private String offerUuid;

    @Id
    @Column(name = "depot_id", nullable = false)
    private Integer depotId;

    // Getters and Setters
    public String getOfferString() {
        return offerUuid;
    }

    public void setOfferString(String offerUuid) {
        this.offerUuid = offerUuid;
    }

    public Integer getDepotId() {
        return depotId;
    }

    public void setDepotId(Integer depotId) {
        this.depotId = depotId;
    }

    // public static class SalesOfferDepotId implements Serializable {
    // private String offerString;
    // private Integer depotId;

    // public SalesOfferDepotId() {
    // }

    // public SalesOfferDepotId(String offerString, Integer depotId) {
    // this.offerString = offerString;
    // this.depotId = depotId;
    // }

    // public String getOfferString() {
    // return offerString;
    // }

    // public void setOfferString(String offerString) {
    // this.offerString = offerString;
    // }

    // public Integer getDepotId() {
    // return depotId;
    // }

    // public void setDepotId(Integer depotId) {
    // this.depotId = depotId;
    // }

    // @Override
    // public boolean equals(Object o) {
    // if (this == o)
    // return true;
    // if (!(o instanceof SalesOfferDepotId))
    // return false;
    // SalesOfferDepotId that = (SalesOfferDepotId) o;
    // return offerString.equals(that.offerString) && depotId.equals(that.depotId);
    // }

    // @Override
    // public int hashCode() {
    // return offerString.hashCode() + depotId.hashCode();
    // }
    // }
}
