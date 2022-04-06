function mapTheRows(rows) {
    const map = {}
  
    for (const row of rows) {
      if (!map[row.id]) {
        map[row.id] = {
        id: row.id,
        creatorId: row.creatorId,
        creatorName: row.creatorName,
        isPublic: row.isPublic,
        name: row.name,
        goal: row.goal,
        activities: [],
        }
        if (row.activityId) {
          map[row.id].activities.push({
            count: row.activityCount,
            duration: row.activityDuration

          })
        }
      } else {
        map[row.id].activities.push({
            count: row.activityCount,
            duration: row.activityDuration
        })
      }
    }
    return Object.values(map)
  }
  
  module.exports = {
    mapTheRows,
  }