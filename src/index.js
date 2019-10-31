module.exports = function({ types: t }) {
  return {
    visitor: {
      Program: function(path) {
        const programArrays = [];
        const plusEqualsSign = "+=";

        path.traverse({
          VariableDeclarator: decPath => {
            const { id, init } = decPath.node;
            const isArrayDeclaration = t.isArrayExpression(init);
            if (isArrayDeclaration) {
              programArrays.push(id.name);
            }
          }
        });
        path.traverse({
          AssignmentExpression: binPath => {
            const { node, skip } = binPath;
            const { operator, left, right } = node;
            if (!t.isIdentifier(left)) skip();
            if (operator !== plusEqualsSign) skip();
            if (!programArrays.includes(left.name)) skip();
            const pushArrayExpression = t.memberExpression(
              t.identifier(left.name),
              t.identifier("push")
            );
            binPath.replaceWith(t.callExpression(pushArrayExpression, [right]));
          }
        });
      }
    }
  };
};
