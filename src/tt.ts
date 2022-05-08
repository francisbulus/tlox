import Token from './token';

class BaseName {
  constructor(
    public left: unknown,
    public operator: unknown,
    public right: unknown
  ) {
    this.left = left;
    this.operator = operator;
    this.right = right;
    class Binary extends BaseName {
      constructor(
        public left: unknown,
        public operator: unknown,
        public right: unknown
      ) {
        super(left, operator, right);
        this.left = left;
        this.operator = operator;
        this.right = right;
      }
    }
  }
}

function defineType(
  baseName: string,
  className: string,
  fieldList: string
): void {
  const fields: string[] = fieldList.split(', ');
  fields.forEach(field => {
    const name: string = field.split('')[1];
  });
  const content = ` 
  
  
  `;
}

class Binary extends BaseName {
  constructor(
    public left: unknown,
    public operator: unknown,
    public right: unknown
  ) {
    super(left, operator, right);
    this.left = left;
    this.operator = operator;
    this.right = right;
  }
}
