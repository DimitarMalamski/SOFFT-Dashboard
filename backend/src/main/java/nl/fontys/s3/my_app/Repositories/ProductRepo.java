package nl.fontys.s3.my_app.Repositories;

import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import nl.fontys.s3.my_app.models.Product;

@Repository
public interface ProductRepo extends JpaRepository<Product, Integer> {
    List<Product> findAllByIdIn(Collection<Integer> ids);
}
