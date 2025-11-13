// src/utils/test-user.factory.ts

export type TestUser = {
    name: string;
    email: string;
    password: string;
  };
  

  function randomString(size = 6): string {
    return Math.random().toString(36).substring(2, 2 + size);
  }
  
  function timestamp(): number {
    return Date.now();
  }
  
  
  export function createRandomUser(): TestUser {
    const ts = timestamp();
    const rnd = randomString();
  
    return {
      name: `User ${ts}`,
      email: `user_${ts}_${rnd}@e2e.test`,
      password: `Pass_${rnd}_${ts.toString().slice(-4)}!A`,
    };
  }
  
  
  export class UserBuilder {
    private user: TestUser;
  
    private constructor() {
      const ts = timestamp();
      const rnd = randomString();
  
      this.user = {
        name: `User ${ts}`,
        email: `user_${ts}_${rnd}@e2e.test`,
        password: `Pass_${rnd}_${ts.toString().slice(-4)}!A`,
      };
    }
  
    static aValidUser(): UserBuilder {
      return new UserBuilder();
    }
  
    withName(name: string): UserBuilder {
      this.user.name = name;
      return this;
    }
  
    withEmail(email: string): UserBuilder {
      this.user.email = email;
      return this;
    }
  
    withPassword(password: string): UserBuilder {
      this.user.password = password;
      return this;
    }
  
    withWeakPassword(): UserBuilder {
      this.user.password = "123456";
      return this;
    }
  
    withInvalidEmail(): UserBuilder {
      this.user.email = "invalid-email";
      return this;
    }
  
    build(): TestUser {
      return { ...this.user };
    }
  }
  

  export function createUserWithWeakPassword(): TestUser {
    return UserBuilder.aValidUser().withWeakPassword().build();
  }
  
  export function createUserWithInvalidEmail(): TestUser {
    return UserBuilder.aValidUser().withInvalidEmail().build();
  }
  
  export function createUserWithCustomEmail(email: string): TestUser {
    return UserBuilder.aValidUser().withEmail(email).build();
  }
  