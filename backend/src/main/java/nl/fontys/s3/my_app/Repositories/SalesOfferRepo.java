package nl.fontys.s3.my_app.Repositories;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import nl.fontys.s3.my_app.models.SalesOffer;

@Repository
public interface SalesOfferRepo extends JpaRepository<SalesOffer, Long> {
    Optional<SalesOffer> findByUuid(String uuid);
    Long countByCustomerUuid(String customerUuid);
    List<SalesOffer> findAllByCreatedAtBetween(LocalDateTime start, LocalDateTime end);
    @Query("SELECT s FROM SalesOffer s WHERE s.statusDescription IN :statuses")
    List<SalesOffer> findAllByStatuses(@Param("statuses") List<String> statuses);
}