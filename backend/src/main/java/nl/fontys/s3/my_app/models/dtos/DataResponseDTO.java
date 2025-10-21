package nl.fontys.s3.my_app.models.dtos;

import java.util.List;

public class DataResponseDTO<T> {
    private List<T> data;

    public DataResponseDTO(List<T> data) {
        this.data = data;
    }

    public List<T> getData() {
        return data;
    }

    public void setData(List<T> data) {
        this.data = data;
    }
}