package nl.fontys.s3.my_app.models.dtos;

public class SingleDataResponseDTO<T> {
    private T data;

    public SingleDataResponseDTO(T data) {
        this.data = data;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}