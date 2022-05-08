"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseName {
    constructor(left, operator, right) {
        this.left = left;
        this.operator = operator;
        this.right = right;
        this.left = left;
        this.operator = operator;
        this.right = right;
        class Binary extends BaseName {
            constructor(left, operator, right) {
                super(left, operator, right);
                this.left = left;
                this.operator = operator;
                this.right = right;
                this.left = left;
                this.operator = operator;
                this.right = right;
            }
        }
    }
}
function defineType(baseName, className, fieldList) {
    const fields = fieldList.split(', ');
    fields.forEach(field => {
        const name = field.split('')[1];
    });
    const content = ` 
  
  
  `;
}
class Binary extends BaseName {
    constructor(left, operator, right) {
        super(left, operator, right);
        this.left = left;
        this.operator = operator;
        this.right = right;
        this.left = left;
        this.operator = operator;
        this.right = right;
    }
}
//# sourceMappingURL=tt.js.map