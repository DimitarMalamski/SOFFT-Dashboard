package nl.fontys.s3.my_app.models.ids;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class SalesOfferDepotId implements Serializable {

    @Column(name = "offer_uuid", columnDefinition = "char(36)")
    private String offerUuid;

    @Column(name = "depot_id")
    private Integer depotId;

    public SalesOfferDepotId() {
    }

    public SalesOfferDepotId(String offerUuid, Integer depotId) {
        this.offerUuid = offerUuid;
        this.depotId = depotId;
    }

    public String getOfferUuid() {
        return offerUuid;
    }

    public Integer getDepotId() {
        return depotId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (!(o instanceof SalesOfferDepotId that))
            return false;
        return Objects.equals(offerUuid, that.offerUuid)
                && Objects.equals(depotId, that.depotId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(offerUuid, depotId);
    }
}
