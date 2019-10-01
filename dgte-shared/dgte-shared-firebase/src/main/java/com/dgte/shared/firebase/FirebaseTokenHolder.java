package com.dgte.shared.firebase;

public class FirebaseTokenHolder {

    private static final ThreadLocal<String> HOLDER = new ThreadLocal<String>();

    public static void set(String firebaseToken) {
        HOLDER.set(firebaseToken);
    }

    public static String get() {
        return HOLDER.get();
    }

}