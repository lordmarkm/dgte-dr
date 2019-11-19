package com.dgte.erp.rent.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Aspect
@Component
public class ResourceLoggingAspect {

    @Pointcut("execution(* com.dgte.erp.rent.resource..*.*(..))")
    public void resourceMethod() { }

    @Around("resourceMethod()")
    public Object logResourceMethod(ProceedingJoinPoint pjp) throws Throwable {
        long start = System.currentTimeMillis();
        try {
            return pjp.proceed();
        } finally {
            log.debug("{} {} - {} - {} ms",
                    pjp.getSignature().getDeclaringType().getSimpleName(),
                    pjp.getSignature().getName(),
                    pjp.getArgs(),
                    System.currentTimeMillis() - start);
        }
    }

}
