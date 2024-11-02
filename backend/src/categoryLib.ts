import { Category } from '../../shared/classes/category';

class CategoryLib {
    private categories: Category[] = [];
  
    constructor(initialCategories: Category[]) {
      this.categories = initialCategories
    }
  
    public getAll(): Category[] {
      return this.categories;
    }
  }
  
  export default CategoryLib;
  