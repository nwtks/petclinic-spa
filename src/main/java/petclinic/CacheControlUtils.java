package petclinic;

import javax.ws.rs.core.CacheControl;

public final class CacheControlUtils {
    private CacheControlUtils() {
    }

    public static CacheControl noCache() {
        final CacheControl cacheControl = new CacheControl();
        cacheControl.setPrivate(true);
        cacheControl.setNoCache(true);
        cacheControl.setNoStore(true);
        cacheControl.setMustRevalidate(true);
        cacheControl.setProxyRevalidate(true);
        return cacheControl;
    }
}
