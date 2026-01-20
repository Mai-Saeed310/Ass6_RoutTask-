function removeElement(nums, val) {
    
    let filtered = nums.filter(num => num !== val);
    
    for (let i = 0; i < filtered.length; i++) {
        nums[i] = filtered[i];
    }
    
    return filtered.length; 
}
