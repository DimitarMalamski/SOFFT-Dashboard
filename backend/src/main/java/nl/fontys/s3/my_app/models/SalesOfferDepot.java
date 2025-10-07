package nl.fontys.s3.my_app.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import java.io.Serializable;
import java.util.UUID;

@Entity
@Table(name = "sales_offer_depot", schema = "dbo")
@IdClass(SalesOfferDepot.SalesOfferDepotId.class)
public class SalesOfferDepot {

    @Id
    @Column(name = "offer_uuid", nullable = false, columnDefinition = "uniqueidentifier")
    private UUID offerUuid;

    @Id
    @Column(name = "depot_id", nullable = false)
    private Integer depotId;

    // Getters and Setters
    public UUID getOfferUuid() {
        return offerUuid;
    }

    public void setOfferUuid(UUID offerUuid) {
        this.offerUuid = offerUuid;
    }

    public Integer getDepotId() {
        return depotId;
    }

    public void setDepotId(Integer depotId) {
        this.depotId = depotId;
    }

    // Composite Key Class
    public static class SalesOfferDepotId implements Serializable {
        private UUID offerUuid;
        private Integer depotId;

        public SalesOfferDepotId() {
        }

        public SalesOfferDepotId(UUID offerUuid, Integer depotId) {
            this.offerUuid = offerUuid;
            this.depotId = depotId;
        }

        // Getters, Setters, equals(), and hashCode()
        public UUID getOfferUuid() {
            return offerUuid;
        }

        public void setOfferUuid(UUID offerUuid) {
            this.offerUuid = offerUuid;
        }

        public Integer getDepotId() {
            return depotId;
        }

        public void setDepotId(Integer depotId) {
            this.depotId = depotId;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o)
                return true;
            if (!(o instanceof SalesOfferDepotId))
                return false;
            SalesOfferDepotId that = (SalesOfferDepotId) o;
            return offerUuid.equals(that.offerUuid) && depotId.equals(that.depotId);
        }

        @Override
        public int hashCode() {
            return offerUuid.hashCode() + depotId.hashCode();
        }
    }
}
