import java.util.Scanner;

public class Calculator {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        boolean running = true;

        System.out.println("Basic Java Calculator");

        while (running) {
            System.out.println("\nChoose an operation:");
            System.out.println("1. Addition");
            System.out.println("2. Subtraction");
            System.out.println("3. Multiplication");
            System.out.println("4. Division");
            System.out.println("5. Exit");
            System.out.print("Enter your choice: ");

            int choice = scanner.nextInt();

            if (choice == 5) {
                running = false;
                System.out.println("Calculator closed.");
                continue;
            }

            if (choice < 1 || choice > 5) {
                System.out.println("Invalid choice. Please try again.");
                continue;
            }

            System.out.print("Enter first number: ");
            double firstNumber = scanner.nextDouble();

            System.out.print("Enter second number: ");
            double secondNumber = scanner.nextDouble();

            double result;

            switch (choice) {
                case 1:
                    result = firstNumber + secondNumber;
                    System.out.println("Result: " + result);
                    break;
                case 2:
                    result = firstNumber - secondNumber;
                    System.out.println("Result: " + result);
                    break;
                case 3:
                    result = firstNumber * secondNumber;
                    System.out.println("Result: " + result);
                    break;
                case 4:
                    if (secondNumber == 0) {
                        System.out.println("Error: Cannot divide by zero.");
                    } else {
                        result = firstNumber / secondNumber;
                        System.out.println("Result: " + result);
                    }
                    break;
                default:
                    System.out.println("Invalid choice. Please try again.");
            }
        }

        scanner.close();
    }
}
