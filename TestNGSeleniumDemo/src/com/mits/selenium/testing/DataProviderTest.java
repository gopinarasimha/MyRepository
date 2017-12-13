package com.mits.selenium.testing;

import org.testng.Assert;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

public class DataProviderTest {

	// =================================================================
	// Odd Digit Test
	public class OddDigit {
		public Boolean validate(int num) {

			return (num % 2 == 0 ? false : true);
		}
	}

	private OddDigit oddDigit;

	@BeforeMethod
	public void initialize() {
		oddDigit = new OddDigit();
	}

	@DataProvider(name = "OddDigitTest")
	public static Object[][] getNumbers() {
		return new Object[][] { { 1, true }, { 7, true }, { 10, false }, { 12, false }, { 15, true } };
	}

	// This test will run 5 times as we are passing 5 parameters.
	@Test(dataProvider = "OddDigitTest")
	public void testPrimeNumberChecker(Integer inputNumber, Boolean expectedResult) {
		System.out.println(inputNumber + " " + expectedResult);
		//Assert.assertEquals(expectedResult, oddDigit.validate(inputNumber));
		Assert.fail();
	}

	// =================================================================
	// Java Bean Object Test
	public static class JBean {
		private String type;

		public JBean(String type) {
			this.type = type;
		}

		public String getVal() {
			return type;
		}

		public void setVal(String type) {
			this.type = type;
		}
	}

	@DataProvider(name = "JavaBeanObjectTest")
	public static Object[][] getJBeans() {
		return new Object[][] { { new JBean("Stateless Session Beans") }, { new JBean("Stateful Session Beans") } };
	}

	@Test(dataProvider = "JavaBeanObjectTest")
	public void testMethod(JBean myBean) {
		System.out.println(myBean.getVal());
	}

}
