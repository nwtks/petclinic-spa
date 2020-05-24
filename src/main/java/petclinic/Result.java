package petclinic;

import java.util.List;

public class Result<T> {
    public T payload;
    public List<String> messages;

    public Result(final T payload, final List<String> messages) {
        this.payload = payload;
        this.messages = messages;
    }
}
