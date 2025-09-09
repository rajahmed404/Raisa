bot.command('mensonall', async (message) => {
    try {
        // নিশ্চিত করুন যে মেসেজ গ্রুপে এসেছে
        if (!message.groupId) {
            await bot.sendMessage(message.sender.id, 'এই কমান্ডটি গ্রুপে ব্যবহার করতে হবে।');
            return;
        }

        // গ্রুপের সব মেম্বার নাও
        const members = await bot.getGroupMembers(message.groupId);

        // সব মেম্বারের At object বানাও
        const atList = members.map(member => ({ type: 'At', target: member.id }));

        // মেসেজ পাঠাও সবকে মেনশন করে
        await bot.sendMessage(message.groupId, [
            { type: 'Plain', text: '📢 সবাইকে ডাকা হলো! ' },
            ...atList
        ]);

    } catch (error) {
        console.error('Mensonall কমান্ডে সমস্যা:', error);
        await bot.sendMessage(message.groupId, 'মেম্বার লোড করতে সমস্যা হয়েছে।');
    }
});
