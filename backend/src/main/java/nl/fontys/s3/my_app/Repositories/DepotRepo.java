package nl.fontys.s3.my_app.Repositories;

import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import nl.fontys.s3.my_app.models.Depot;

@Repository
public interface DepotRepo extends JpaRepository<Depot, Long> {
    List<Depot> findAllByIdIn(Collection<Integer> ids);
}
