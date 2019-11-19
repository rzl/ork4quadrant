export function hasPermission(rule, permissions) {
  if (typeof rule === 'string') {
    rule = rule.replace(/\(/g,'( ')
    rule = rule.replace(/\)/g,' )')
    var str = rule.split(/\s+/).map((x) => {
      if (['||', '&&', '(', ')'].indexOf(x) > -1) {
        return x
      } else {
        return permissions.indexOf(x) > -1
      }
    }).join(' ')
    return eval(str)
  } else {
    return false
  }
}

export function listToTreeByParentId(list) {
  return listToTree(list, 'dingid', 'dingParentId')
}

export function listToTree(list, idKey, parentIdKey, fn) {
  if (!fn) {
    fn = function(list, idKey, parentIdKey, x) {
      return list[x][parentIdKey]
    }
  }
  var tree = []
  var tmp = {}
  //  var groupParent
  var GroupID
  var x
  /**
   * 初始化children
   */
  for (x in list) {
    GroupID = list[x][idKey]
    tmp[GroupID] = list[x]
    if (tmp[GroupID].children === undefined) {
      tmp[GroupID].children = []
    }
  }
  for (x in list) {
    GroupID = list[x][idKey]
    var parentGroupID = fn(list, idKey, parentIdKey, x)
    tmp[GroupID] = list[x]
    if (tmp[parentGroupID] === undefined) {
      tree.push(tmp[GroupID])
      continue
    } else {
      tmp[parentGroupID].children.push(tmp[GroupID])
      tmp[GroupID].parent = tmp[parentGroupID]
    }
  }
  return tree
}
