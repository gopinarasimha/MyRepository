package com.mits.batch;

public class BatchDemo {
	
	public int add(int a,int b){
		
		int result = 0;
		
		try{
			System.out.println("Entered into add method");
			
			result = a+b;
			
			System.out.println("Exit From add method");
			
		}catch(Exception e){
			
			e.printStackTrace();
			
			System.out.println("Exception Occured in add method:"+e.getMessage());
		}
		
		return result;
	}

	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}

}
