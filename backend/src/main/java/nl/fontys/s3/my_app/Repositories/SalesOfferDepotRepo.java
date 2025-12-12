package nl.fontys.s3.my_app.Repositories;

import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import nl.fontys.s3.my_app.models.SalesOfferDepot;
import nl.fontys.s3.my_app.models.ids.SalesOfferDepotId;

@Repository
public interface SalesOfferDepotRepo extends JpaRepository<SalesOfferDepot, SalesOfferDepotId> {
    @Query("select l from SalesOfferDepot l where l.id.offerUuid in :offerUuids")
    List<SalesOfferDepot> findAllByOfferUuidIn(@Param("offerUuids") Collection<String> offerUuids);
}
