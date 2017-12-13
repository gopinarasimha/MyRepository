package com.mits.selenium.testing;

import org.testng.annotations.Optional;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

public class OptionalTesting {
  
	@Parameters({ "optional-value" })
    @Test
    public void optionCheck(@Optional("Optional Value") String value) {
        System.out.println("This is: " + value);
    }
}
