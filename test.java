class A { 
    void foo() { 
        System.out.println("a"); 
    } 
}

class B extends A { 
    // B inherits foo() from A 
}

class C extends A { 
    @Override 
    void foo() { 
        System.out.println("c"); 
    } 
}

class D extends B { 
    @Override 
    void foo() { 
        System.out.println("d"); 
    } 
}

public class test{
    
    public static void main(String[] args){
        
    }
}