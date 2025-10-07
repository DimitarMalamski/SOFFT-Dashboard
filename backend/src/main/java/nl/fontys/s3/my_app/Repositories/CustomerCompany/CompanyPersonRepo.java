package nl.fontys.s3.my_app.Repositories.CustomerCompany;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import nl.fontys.s3.my_app.models.CompanyPerson;

@Repository
public interface CompanyPersonRepo extends JpaRepository<CompanyPerson, Long> {
    Optional<CompanyPersonRepo> findByCompany_Uuid(UUID companyUuid);
}
