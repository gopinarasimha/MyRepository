package com.mits.batch.testing.automation;

import org.testng.Assert;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

import com.mits.batch.BatchDemo;

public class BatchTestAutomation {

	@Parameters({ "value1", "value2","value3" })
	@Test
	public void verifyAdditionFunctionality1(int value1,int value2,int value3){
		
		int result;
		
		try{
			BatchDemo batchDemo = new BatchDemo();
			
			result = batchDemo.add(value1, value2);
			
			System.out.println("Result Is :"+result);
			
			Assert.assertEquals(value3, result);
			
		}catch(Exception e){
			
			e.printStackTrace();
			
			Assert.fail();
			
			System.out.println("Exception Occured in verifyAdditionFunctionality:"+e.getMessage());
			
		}
	}
	
	@Parameters({ "value1", "value2","value3" })
	@Test
	public void verifyAdditionFunctionality2(int value1,int value2,int value3){
		
		int result;
		
		try{
			BatchDemo batchDemo = new BatchDemo();
			
			result = batchDemo.add(value1, value2);
			
			System.out.println("Result Is :"+result);
			
			Assert.assertEquals(value3, result);
			
		}catch(Exception e){
			
			e.printStackTrace();
			
			Assert.fail();
			
			System.out.println("Exception Occured in verifyAdditionFunctionality:"+e.getMessage());
			
		}
	}
	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}

}
