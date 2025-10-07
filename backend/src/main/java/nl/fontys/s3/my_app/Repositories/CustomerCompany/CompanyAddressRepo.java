package nl.fontys.s3.my_app.Repositories.CustomerCompany;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import nl.fontys.s3.my_app.models.CompanyAddress;

@Repository
public interface CompanyAddressRepo extends JpaRepository<CompanyAddress, Long> {
    Optional<CompanyAddress> findByCompany_Uuid(UUID companyUuid);
}
