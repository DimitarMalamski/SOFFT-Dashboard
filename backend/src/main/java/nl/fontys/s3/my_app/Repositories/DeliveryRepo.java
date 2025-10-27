package nl.fontys.s3.my_app.Repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import nl.fontys.s3.my_app.models.Delivery;

@Repository
public interface DeliveryRepo extends JpaRepository<Delivery, Long> {
    Optional<Delivery> findByUuid(String uuid);
    Optional<Delivery> findByFromAddressUuid(String fromAddressUuid);
    Optional<Delivery> findByToAddressUuid(String toAddressUuid);
}
