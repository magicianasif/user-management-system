import {
  signInValidationSchema,
  signUpValidationSchema,
} from "../src/app/validations/FormValidations";

describe("Validation Schemas", () => {
  describe("SignIn Validation Schema", () => {
    it("should validate correctly with valid data", async () => {
      const validData = { username: "testuser", password: "password123" };
      await expect(signInValidationSchema.validate(validData)).resolves.toEqual(
        validData
      );
    });

    it("should throw an error for missing username", async () => {
      const invalidData = { password: "password123" };
      await expect(
        signInValidationSchema.validate(invalidData)
      ).rejects.toThrow("Username is required");
    });

    it("should throw an error for missing password", async () => {
      const invalidData = { username: "testuser" };
      await expect(
        signInValidationSchema.validate(invalidData)
      ).rejects.toThrow("Password is required");
    });
  });

  describe("SignUp Validation Schema", () => {
    it("should validate correctly with valid data", async () => {
      const validData = {
        fullName: "Test User",
        username: "testuser",
        email: "test@example.com",
        password: "password123",
        confirmPassword: "password123",
      };
      await expect(signUpValidationSchema.validate(validData)).resolves.toEqual(
        validData
      );
    });

    it("should throw an error for missing email", async () => {
      const invalidData = {
        fullName: "Test User",
        username: "testuser",
        password: "password123",
        confirmPassword: "password123",
      };
      await expect(
        signUpValidationSchema.validate(invalidData)
      ).rejects.toThrow("Email is required");
    });

    it("should throw an error for invalid email", async () => {
      const invalidData = {
        fullName: "Test User",
        username: "testuser",
        email: "invalid-email",
        password: "password123",
        confirmPassword: "password123",
      };
      await expect(
        signUpValidationSchema.validate(invalidData)
      ).rejects.toThrow("Invalid email address");
    });

    it("should throw an error if passwords do not match", async () => {
      const invalidData = {
        fullName: "Test User",
        username: "testuser",
        email: "test@example.com",
        password: "password123",
        confirmPassword: "wrongpassword",
      };
      await expect(
        signUpValidationSchema.validate(invalidData)
      ).rejects.toThrow("Passwords must match");
    });

    it("should throw an error if password is too short", async () => {
      const invalidData = {
        fullName: "Test User",
        username: "testuser",
        email: "test@example.com",
        password: "123",
        confirmPassword: "123",
      };
      await expect(
        signUpValidationSchema.validate(invalidData)
      ).rejects.toThrow("Password must be at least 5 characters");
    });

    it("should throw an error for missing full name", async () => {
      const invalidData = {
        username: "testuser",
        email: "test@example.com",
        password: "password123",
        confirmPassword: "password123",
      };
      await expect(
        signUpValidationSchema.validate(invalidData)
      ).rejects.toThrow("Full name is required");
    });

    // it("should throw an error for empty fields", async () => {
    //   const invalidData = {
    //     fullName: "",
    //     username: "",
    //     email: "",
    //     password: "",
    //     confirmPassword: "",
    //   };
    //   await expect(
    //     signUpValidationSchema.validate(invalidData)
    //   ).rejects.toThrow("Full name is required");
    // });

    it("should throw an error for missing confirmPassword", async () => {
      const invalidData = {
        fullName: "Test User",
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      };
      await expect(
        signUpValidationSchema.validate(invalidData)
      ).rejects.toThrow("Confirm password is required");
    });

    it("should throw an error for confirmPassword not matching password", async () => {
      const invalidData = {
        fullName: "Test User",
        username: "testuser",
        email: "test@example.com",
        password: "password123",
        confirmPassword: "differentPassword",
      };
      await expect(
        signUpValidationSchema.validate(invalidData)
      ).rejects.toThrow("Passwords must match");
    });

    // it("should throw an error for spaces-only in required fields", async () => {
    //   const invalidData = {
    //     fullName: "   ",
    //     username: "   ",
    //     email: "   ",
    //     password: "   ",
    //     confirmPassword: "   ",
    //   };
    //   await expect(
    //     signUpValidationSchema.validate(invalidData)
    //   ).rejects.toThrow("Full name is required");
    // });
  });
});
