module.exports = function({ types: t }) {
  return {
    visitor: {
      Program: function(path) {
        const plusEqualsSign = "+=";
        const renameIdFlagSeparator = "___";
        const undescore = "_";

        const assignPush = pathToAssign => {
          const { node } = pathToAssign;
          const { left, right } = node;
          const pushArrayExpression = t.memberExpression(
            t.identifier(left.name),
            t.identifier("push")
          );
          pathToAssign.replaceWith(
            t.callExpression(pushArrayExpression, [right])
          );
        };
        const createVariableUniqueId = id => {
          return `${id.name}___${id.start}_${id.end}`;
        };
        const isAssignCandidate = nameToTest => {
          const [, id] = nameToTest.split(renameIdFlagSeparator);
          if (!id) return false;
          const [start, end] = id.split(undescore);
          return !!(start && end);
        };
        path.traverse({
          VariableDeclarator: variablePath => {
            const { id, init } = variablePath.node;
            if (t.isArrayExpression(init)) {
              const newName = createVariableUniqueId(id);
              variablePath.scope.rename(id.name, newName);
            }
          },
          AssignmentExpression: binPath => {
            const { node } = binPath;
            const { operator, left } = node;
            if (!t.isIdentifier(left)) return;
            if (operator !== plusEqualsSign) return;
            if (isAssignCandidate(left.name)) {
              assignPush(binPath);
            }
          }
        });
      }
    }
  };
};
